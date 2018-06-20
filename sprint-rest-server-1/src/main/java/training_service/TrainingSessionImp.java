package training_service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/**
 * @author Boaz Nahum
 */

class TrainingSessionImp implements TrainingSession {

    private Path baseDir = Paths.get("F:\\views\\g\\two_locals_one_remote");

    public TrainingSessionImp(String sessionID) {

    }

    @Override
    public byte[] getImage(String repoID) throws IOException {


        Path imagePath = baseDir.resolve("out").resolve(repoID + ".png");



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

        Path repoDir = baseDir.resolve(repoID);

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
                    outI.append(scanner.nextLine() + "\n");
                }

                return outI.toString();
            });
    }
}
