package com.auth.server.util;

import com.auth.server.exception.CustomBadRequestException;
import com.auth.server.exception.CustomInternalServerErrorException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import static com.auth.server.constants.Values.uploadDir;

@Component
public class FileUtil {

    public String saveFile(MultipartFile file){
        if (file==null || file.isEmpty()){
            throw new CustomBadRequestException("File is null or empty");
        }
        try {
            Path filePath = Paths.get(uploadDir);
            if (!Files.exists(filePath)){
                Files.createDirectories(filePath);
            }
            String originalName = file.getOriginalFilename();
            String extension=".";
            if (originalName != null){
                extension = originalName.substring(originalName.indexOf("."));
            }
            String fileName = UUID.randomUUID()+extension;
            Path path = filePath.resolve(fileName);
            return path.toString();
        } catch (IOException exception){
            throw new CustomInternalServerErrorException(exception.getMessage());
        }
    }
    public void removeFile(String fileName){
        try {
            Path path = Paths.get(uploadDir,fileName);
            Files.deleteIfExists(path);
        } catch (IOException exception){
            throw new CustomInternalServerErrorException(exception.getMessage());
        }
    }
}
