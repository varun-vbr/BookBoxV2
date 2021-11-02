package com.bookboxv2.bookservice.service;

import com.bookboxv2.bookservice.exceptions.AppError;
import com.bookboxv2.bookservice.models.Publisher;
import com.bookboxv2.bookservice.repositories.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PublisherService {
    @Autowired
    private PublisherRepository publisherRepository;

    public void addPublisher(Map<String, Object> params) {
        try{
            if(params.get("publisherName") != null && !((String)params.get("publisherName")).trim().equalsIgnoreCase("")){
                Publisher publisher = new Publisher();
                publisher.setPublisherName((String)params.get("publisherName"));
                publisherRepository.save(publisher);
                return;
            }
        } catch (Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        throw new AppError("Missing/Invalid required request parameters", HttpStatus.BAD_REQUEST.value(), true);
    }

    public Publisher findPublisherById(long id){
        try{
            Optional<Publisher> publisher = publisherRepository.findById(id);
            if(publisher.isPresent()){
                return publisher.get();
            }
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
        throw new AppError("There is no publisher with the given Id", HttpStatus.NOT_FOUND.value(), true);
    }

    public List<Publisher> findAllByPublisherName(String publisherName){
        try{
            return publisherRepository.findAllByPublisherNameIgnoreCaseContaining(publisherName);
        }catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public List<Publisher> listAllPublishers(){
        try{
            return publisherRepository.findAll();
        } catch(Exception ex){
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }

    public void deletePublisher(long id){
        try{
            publisherRepository.deleteById(id);
        } catch(Exception ex) {
            throw new AppError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), false);
        }
    }
}
