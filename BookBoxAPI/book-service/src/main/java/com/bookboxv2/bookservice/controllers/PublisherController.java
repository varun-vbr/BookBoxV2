package com.bookboxv2.bookservice.controllers;

import com.bookboxv2.bookservice.models.Publisher;
import com.bookboxv2.bookservice.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/publisher")
public class PublisherController {
    @Autowired
    private PublisherService publisherService;

    @GetMapping(path = "/{publisherId}")
    @ResponseBody
    public Publisher getPublisherById(@PathVariable long publisherId){ return publisherService.findPublisherById(publisherId); }

    @GetMapping(path = "/name/{publisherName}")
    @ResponseBody
    public List<Publisher> getPublisherByName(@PathVariable String publisherName){ return publisherService.findAllByPublisherName(publisherName); }

    @GetMapping(path = "/")
    @ResponseBody
    public List<Publisher> getAllPublishers(){ return publisherService.listAllPublishers(); }

    @PostMapping(path = "/")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addPublisher(@RequestBody Map<String, Object> params){ publisherService.addPublisher(params); }

    @DeleteMapping(path = "/{publisherId}")
    public void deletePublisher(@PathVariable long publisherId){ publisherService.deletePublisher(publisherId); }
}
