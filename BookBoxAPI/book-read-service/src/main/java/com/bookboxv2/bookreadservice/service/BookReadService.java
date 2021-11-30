package com.bookboxv2.bookreadservice.service;

import com.bookboxv2.bookreadservice.exceptions.AppError;
import com.bookboxv2.bookreadservice.models.BookRead;
import com.bookboxv2.bookreadservice.repositories.BookReadRepository;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.parser.PdfTextExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookReadService {

    @Autowired
    private BookReadRepository bookReadRepository;

    public Map<String, Object> openBook(long bookId, long userId, String path){
        try{
            List<BookRead> bookRead = bookReadRepository.findByBookIdAndUserId(bookId, userId);
            if(bookRead.size() == 0){
                persistBookRead(bookId, userId, null);
                return getPage(path, null);
            } else{
                persistBookRead(bookId, userId, bookRead.get(0));
                return getPage(path, bookRead.get(0));
            }
        }catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }



    public Map<String, Object> getPage(String path, BookRead bookRead){
        int pageToRead = 1;
        Resource resource = new ClassPathResource(path);
        Map<String, Object> page = new HashMap<String, Object>();
        try (PdfReader reader = new PdfReader(resource.getInputStream())) {
            int totalPages = reader.getNumberOfPages();
            if(bookRead != null){
                pageToRead = (int)(((double)bookRead.getProgress()/100) * totalPages);
                if(pageToRead == 0){
                    pageToRead = 1;
                }
            }
            PdfTextExtractor extractor = new PdfTextExtractor(reader);
                page.put("content", extractor.getTextFromPage(pageToRead));
                page.put("pageNumber", pageToRead);

        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        return page;
    }

    public Map<String, Object> getPage(String path, int pageNumber){
        Resource resource = new ClassPathResource(path);
        Map<String, Object> page = new HashMap<String, Object>();
        try (PdfReader reader = new PdfReader(resource.getInputStream())) {
            PdfTextExtractor extractor = new PdfTextExtractor(reader);
            page.put("content", extractor.getTextFromPage(pageNumber));
            page.put("pageNumber", pageNumber);
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        return page;
    }

    public void persistBookRead(long bookId, long userId, BookRead bookRead){
        if(bookRead != null){
            bookReadRepository.save(bookRead);
        } else{
            BookRead read = new BookRead();
            read.setBookId(bookId);
            read.setUserId(userId);
            bookReadRepository.save(read);
        }
    }

    public boolean isValidRequest(Map<String, Object> request){
        return request.containsKey("bookId")
                && request.containsKey("userId")
                && request.containsKey("path")
                && request.containsKey("pageNumber");
    }

    public void closeBook(Map<String, Object> request){
        if(isValidRequest(request)){
            Resource resource = new ClassPathResource((String) request.get("path"));
            try (PdfReader reader = new PdfReader(resource.getInputStream())) {
                int newPercentCompletion = (int)((Double.valueOf((int)request.get("pageNumber"))/reader.getNumberOfPages()) * 100);
                List<BookRead> read = bookReadRepository.findByBookIdAndUserId(Long.valueOf((int)request.get("bookId")), Long.valueOf((int)request.get("userId")));
                if(read.size() > 0){
                    BookRead bookRead = read.get(0);
                    bookRead.setProgress(newPercentCompletion);
                    bookReadRepository.save(bookRead);
                }
            } catch(Exception ex){
                throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
            }

        } else{
            throw new AppError("Request missing required attributes", HttpStatus.BAD_REQUEST.value(), true);
        }
    }

    public List<BookRead> getTopUserReads(long userId){
        List<BookRead> topReads = new ArrayList<BookRead>();
        List<BookRead> allReads = bookReadRepository.findByUserIdOrderByProgressAsc(userId);
        if(allReads.size() > 10){
            for(int i = 0; i < 10; i++){
                topReads.add(allReads.get(i));
            }
            return topReads;
        } else {
            return allReads;
        }
    }




}
