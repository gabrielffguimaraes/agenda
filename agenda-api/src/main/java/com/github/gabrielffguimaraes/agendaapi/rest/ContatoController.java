package com.github.gabrielffguimaraes.agendaapi.rest;


import com.github.gabrielffguimaraes.agendaapi.model.entity.Contato;
import com.github.gabrielffguimaraes.agendaapi.model.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contatos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ContatoController {
    private final ContatoRepository contatoRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contato save(@RequestBody Contato contato){
        return this.contatoRepository.save(contato);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable(name = "id") Integer id){
        this.contatoRepository.findById(id).map(
               contato -> {
                   contatoRepository.delete(contato);
                   return Void.TYPE;
               }
        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Contato nao encotrado"));
    }

    @GetMapping
    public List<Contato> listarTodos(){
        return this.contatoRepository.findAll();
    }

    @PatchMapping("{id}/favorite/{flag}")
    public void favorite(@PathVariable(name="id") Integer id , @PathVariable (name="flag") Boolean favorite){
        Optional<Contato> contato = contatoRepository.findById(id);
        contato.ifPresent( c -> {
            c.setFavorito(favorite);
            contatoRepository.save(c);
        });
                /*
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Contato nao encontrado"));*/
    }
}
