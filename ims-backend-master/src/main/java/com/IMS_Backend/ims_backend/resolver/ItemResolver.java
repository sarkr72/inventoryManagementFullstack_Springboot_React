package com.IMS_Backend.ims_backend.resolver;

import java.util.ArrayList;
import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Item;
import com.IMS_Backend.ims_backend.repository.ItemRepository;

@Controller
public class ItemResolver {

    private final ItemRepository itemRepository;

    public ItemResolver(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @QueryMapping
    public Item getItem(@Argument Long id) {
        return itemRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Item not found with id: " + id));
    }

    @QueryMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
    
//    @QueryMapping
//    public List<Item> getAllItems() {
//        List<Item> items = new ArrayList<>();
//        items.add(new Item("Test Item", 9.99));
//        return items;
//    }

}

