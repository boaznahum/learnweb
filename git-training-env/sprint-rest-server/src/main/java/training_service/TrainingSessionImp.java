package training_service;

import org.springframework.util.FileSystemUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.ListIterator;
import java.util.Scanner;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

/**
 * @author Boaz Nahum
 */

class TrainingSessionImp implements TrainingSession {

    private final Path baseDir;
    private final List<Process> bgProcesses = new ArrayList<>(3);

    TrainingSessionImp(String sessionID) {

        String amat_sw_root_volume = System.getenv("AMAT_SW_ROOT_VOLUME");
        if (amat_sw_root_volume == null) {
            amat_sw_root_volume = "F:\\";
        } else {
            amat_sw_root_volume = amat_sw_root_volume.replace("/","\\");
        }
        baseDir = Paths.get(amat_sw_root_volume +"views\\g\\git_training_env\\sessions\\" + sessionID);

    }

    @Override
    public long getImageID(String repoID) throws IOException {

        Path imagePath = getImagePath(repoID);


        return Files.getLastModifiedTime(imagePath).to(TimeUnit.MICROSECONDS);

    }

    @Override
    public byte[] getImage(String repoID) throws IOException {


        Path imagePath = getImagePath(repoID);



        try (InputStream resourceAsStream = Files.newInputStream(imagePath)) {

            int len = resourceAsStream.available();

            byte[] img = new byte[len];

            resourceAsStream.read(img);

            return img;

        }


    }


    private String runCommandOnRepo(String repoId, List<String> command, boolean waitFor)
        throws InterruptedException, ExecutionException, IOException {
        String cmd = String.join(" ", command);
        return runCommandOnRepo(repoId, cmd, waitFor);

    }


    @Override
    public String runCommandOnRepo(String repoID, String command, boolean waitFor)
        throws IOException, ExecutionException, InterruptedException {
        Path repoDir = getRepoDir(repoID);
        return runCommand(repoDir, command, waitFor);

    }

    private String runCommand(Path workingDirectory, String command, boolean waitFor) throws IOException, ExecutionException,
        InterruptedException {

        Logger logger = Logger.getGlobal();
        logger.info("running command '" + command + "' in '" + workingDirectory.toAbsolutePath().toString() + "'");
        ProcessBuilder pb = new ProcessBuilder();

        pb.command(command.split("\\s+"));

        pb.directory(workingDirectory.toFile());

        Process process = pb.start();

        String stdOut;
        String stdErr;
        CompletableFuture<String> stdOutTask = getOutTask(process.getInputStream(), waitFor);
        CompletableFuture<String> stdErrTask = getOutTask(process.getErrorStream(), waitFor);

        if (waitFor) {
            stdOut = stdOutTask.get();
            stdErr = stdErrTask.get();
        } else {
            stdOut="not available since not waiting\n";
            stdErr="not available since not waiting\n";
            bgProcesses.add(process);
        }

        logger.info("\nSTDOUT:\n"+stdOut +"STDERR:\n"+stdErr);


        return stdOut + "\n" + stdErr;


    }


    private CompletableFuture<String> getOutTask(InputStream inputStream, boolean appendOutput) {
        return CompletableFuture.supplyAsync(() -> {

                StringBuilder outI = new StringBuilder();

                Scanner scanner = new Scanner(inputStream);

                if (appendOutput) {
                    while (scanner.hasNextLine()) {
                        outI.append(scanner.nextLine()).append("\n");
                    }
                }else {
                    while (scanner.hasNextLine()) {
                        scanner.nextLine();
                    }
                }


                return outI.toString();
            });
    }

    void init() throws InterruptedException, ExecutionException, IOException {

        // create 3 repositories
        // put watch on each

        createRepo(REMOTE, true);
        cloneLocalRepo(REMOTE, LOCAL1);
        cloneLocalRepo(REMOTE, LOCAL2);

        //$L2G --verbose -p $LOCAL1 -o $OUT/local1.png --watch &
        //$L2G -p $LOCAL2 -o $OUT/local2.png --watch &
        //$L2G -p $REMOTE -o $OUT/remote.png --watch &
        Path outDir = getOutDir();
        Files.createDirectories(outDir);
        runGitwL2G(REMOTE, outDir.resolve(REMOTE + ".png").toString(), true, false);
        runGitwL2G(LOCAL1, outDir.resolve(LOCAL1 + ".png").toString(), true, false);
        runGitwL2G(LOCAL2, outDir.resolve(LOCAL2 + ".png").toString(), true, false);

    }

    private void createRepo(String repoID, boolean isBare) throws IOException, ExecutionException,
        InterruptedException {

        Path repoDir = getRepoDir(repoID);

        Files.createDirectories(repoDir);

        List<String> command = new ArrayList<>(Arrays.asList("git", "init"));

        if (isBare) {
            command.add("--bare");
        }

        runCommandOnRepo(repoID, command, true);


    }

    private void cloneLocalRepo(String fromRepoID, String toRepoID)
        throws InterruptedException, ExecutionException, IOException {
        List<String> command = new ArrayList<>(Arrays.asList("git", "clone"));

        Path from = getRepoDir(fromRepoID);
        Path to = getRepoDir(toRepoID);

        command.add(from.toAbsolutePath().toString());
        command.add(to.toAbsolutePath().toString());

        runCommand(Paths.get("."), String.join(" ",command),true );

    }

    //$L2G --verbose -p $LOCAL1 -o $OUT/local1.png --watch &
    private void runGitwL2G(String repoID, String outFile, boolean shouldWatch, boolean shouldVerbose)
        throws InterruptedException, ExecutionException, IOException {

        final String GITW_RUNNER =
            "sh //il-nas-01//PD-Application/Application/bin/bundle_root/runners/script_runner.sh - tools/git/gitw/gitw_runner.sh -";

        List<String> command = new ArrayList<>(Arrays.asList(GITW_RUNNER, "l2g"));

        /*if (repoPath != null) {
            command.add("-p");
            command.add(repoPath);
        }*/

        if (outFile != null) {
            command.add("-o");
            command.add(outFile);
        }

        if (shouldWatch) {
            command.add("--watch");
        }

        if (shouldVerbose) {
            command.add("--verbose");
        }

        //command.add("&");

        runCommandOnRepo(repoID, command, false);
    }


    private Path getRepoDir(String repoID) {
        return baseDir.resolve(repoID);
    }

    private Path getOutDir() {
        return baseDir.resolve("out");
    }

    private Path getImagePath(String repoID) {
        return baseDir.resolve("out").resolve(repoID + ".png");
    }

    @Override
    public void shutdown() throws IOException {
        //kill bg processes
        for (ListIterator<Process> iterator = bgProcesses.listIterator(); iterator.hasNext();) {
            Process bgProc = iterator.next();
            bgProc.destroy();
            iterator.remove();
        }

        //delete the session folder
        if (baseDir.toFile().exists()) {
            FileSystemUtils.deleteRecursively(baseDir);
        }

    }


}
