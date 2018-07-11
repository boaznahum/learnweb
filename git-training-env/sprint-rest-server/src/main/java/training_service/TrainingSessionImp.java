package training_service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * @author Boaz Nahum
 */

class TrainingSessionImp implements TrainingSession {

    private final Path baseDir;

    TrainingSessionImp(String sessionID) {

        baseDir = Paths.get("F:\\views\\g\\git_training_env\\sessions\\" + sessionID);

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


    @Override
    public String runCommand(String repoID, String command) throws IOException, ExecutionException,
        InterruptedException {

        Path repoDir = getRepoDir(repoID);

        ProcessBuilder pb = new ProcessBuilder();

        pb.command(command.split("\\s+"));

        pb.directory(repoDir.toFile());

        Process process = pb.start();

        CompletableFuture<String> stdOutTask = getOutTask(process.getInputStream());
        CompletableFuture<String> stdErrTask = getOutTask(process.getErrorStream());


        String stdOut = stdOutTask.get();
        String stdErr = stdErrTask.get();

        return stdOut + "\n" + stdErr;


    }


    private CompletableFuture<String> getOutTask(InputStream inputStream) {
        return CompletableFuture.supplyAsync(() -> {

                StringBuilder outI = new StringBuilder();

                Scanner scanner = new Scanner(inputStream);

                while (scanner.hasNextLine()) {
                    outI.append(scanner.nextLine()).append("\n");
                }

                return outI.toString();
            });
    }

    void init() throws InterruptedException, ExecutionException, IOException {

        // create 3 repositories
        // put watch on each

        createRepo(LOCAL1, false);
        createRepo(LOCAL2, false);
        createRepo(REMOTE, true);



    }

    private void createRepo(String repoID, boolean isBare) throws IOException, ExecutionException,
        InterruptedException {

        Path repoDir = getRepoDir(repoID);

        Files.createDirectories(repoDir);

        String command = "git init";

        if (isBare) {
            command += " --bare";
        }

        runCommand(repoID, command);


    }


    private Path getRepoDir(String repoID) {
        return baseDir.resolve(repoID);
    }

    private Path getImagePath(String repoID) {
        return baseDir.resolve("out").resolve(repoID + ".png");
    }


}
