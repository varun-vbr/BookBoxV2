package com.bookboxv2.bookreadservice.controller;

import com.bookboxv2.bookreadservice.models.BookRead;
import com.bookboxv2.bookreadservice.service.BookReadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/reader")
public class BookReadController {

    @Autowired
    private BookReadService bookReadService;

    @GetMapping(path = "/page")
    @ResponseBody
    public Map<String, Object> getPage( @RequestParam("path") String path, @RequestParam("pageNumber") int pageNumber){
        return bookReadService.getPage(path, pageNumber);
    }

    @GetMapping(path = "/book")
    @ResponseBody
    public Map<String, Object> openBook(@RequestParam("bookId") long bookId, @RequestParam("userId") long userId, @RequestParam("path") String path){ return bookReadService.openBook(bookId, userId, path); }

    @GetMapping(path = "/book/suggestion/{userId}")
    @ResponseBody
    public List<BookRead> getTopUserReads(@PathVariable long userId){ return bookReadService.getTopUserReads(userId); }

    @PutMapping(path = "/book")
    public void closeBook(@RequestBody Map<String, Object> request){ bookReadService.closeBook(request);}
}
