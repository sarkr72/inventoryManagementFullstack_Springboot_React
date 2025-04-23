package com.IMS_Backend.ims_backend.resolver;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Item;
import com.IMS_Backend.ims_backend.repository.ItemRepository;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ItemMutationResolver {

    private final ItemRepository itemRepository;

    public ItemMutationResolver(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @MutationMapping
    public Item addItem(@Argument String name, @Argument double price) {
        Item item = new Item(name, price);
        return itemRepository.save(item);
    }

    @MutationMapping
    public Item updateItem(@Argument Long id, @Argument String name, @Argument double price) {
        Item item = itemRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Item not found with id: " + id));
        item.setName(name);
        item.setPrice(price);
        return itemRepository.save(item);
    }

    @MutationMapping
    public boolean deleteItem(@Argument Long id) {
        Item item = itemRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Item not found with id: " + id));
        itemRepository.delete(item);
        return true;
    }
}
