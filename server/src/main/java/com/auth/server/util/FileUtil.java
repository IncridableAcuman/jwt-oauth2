package com.auth.server.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.auth.server.exception.CustomBadRequestException;
import com.auth.server.exception.CustomInternalServerErrorException;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class FileUtil {
    @Value("${file.upload.dir}")
    private String uploadDir;

    public String saveFile(MultipartFile file){
        if (file==null || file.isEmpty()){
            log.warn("File doesn't exist");
            throw new CustomBadRequestException("File is null or empty");
        }
        try {
            Path filePath = Paths.get(uploadDir);
            if (!Files.exists(filePath)){
                log.info("Creating direct");
                Files.createDirectories(filePath);
            }
            String originalName = file.getOriginalFilename();
            String extension=".";
            if (originalName != null){
                log.info("Existing file original name");
                extension = originalName.substring(originalName.indexOf("."));
            }
            String fileName = UUID.randomUUID()+extension;
            Path path = filePath.resolve(fileName);

            Files.copy(file.getInputStream(), path,StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException exception){
            log.error(exception.getMessage());
            throw new CustomInternalServerErrorException(exception.getMessage());
        }
    }
    public void removeFile(String fileName){
        try {
            Path path = Paths.get(uploadDir,fileName);
            Files.deleteIfExists(path);
        } catch (IOException exception){
            log.error(exception.getMessage());
            throw new CustomInternalServerErrorException(exception.getMessage());
        }
    }
}
