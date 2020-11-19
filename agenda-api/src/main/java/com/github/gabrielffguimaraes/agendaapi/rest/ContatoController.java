package com.github.gabrielffguimaraes.agendaapi.rest;


import com.github.gabrielffguimaraes.agendaapi.model.entity.Contato;
import com.github.gabrielffguimaraes.agendaapi.model.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import javax.servlet.http.Part;
import java.io.InputStream;
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
    public Contato save (
        @RequestParam("nome") String nome,
        @RequestParam("email") String email,
        @RequestParam("favorito") Boolean favorito,
        @RequestParam("telefone") String telefone,
        @RequestParam("foto") Part foto
    )
    {
        Contato contatoRetorno = null;
        try {
            InputStream is = foto.getInputStream();
            byte[] bytes = new byte[(int) foto.getSize()];
            IOUtils.readFully(is, bytes);
            Contato contato = new Contato().
                    builder().
                    nome(nome).
                    email(email).
                    favorito(favorito).
                    telefone(telefone).
                    foto(bytes).
                    build();
            is.close();
            contatoRetorno = this.contatoRepository.save(contato);
        }catch (Exception e){
            return null;
        }
        return contatoRetorno;
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

    @PatchMapping("{id}/favorite")
    public void favorite(@PathVariable(name="id") Integer id , @RequestBody Contato contatoBody){
        Optional<Contato> contato = contatoRepository.findById(id);
        contato.ifPresent( c -> {
            boolean favorito = contatoBody.getFavorito() == Boolean.TRUE;
            c.setFavorito(!favorito);
            contatoRepository.save(c);
        });
                /*
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Contato nao encontrado"));*/
    }
    @PutMapping("{id}/foto")
   public byte[] adicionarFoto(@PathVariable Integer id,@RequestParam("foto") Part file){
        Optional<Contato> contato = this.contatoRepository.findById(id);
        return contato.map(c -> {
            try{
                InputStream is = file.getInputStream();
                byte[] bytes = new byte[(int) file.getSize()];
                IOUtils.readFully(is , bytes);
                c.setFoto(bytes);
                contatoRepository.save(c);
                is.close();
                return bytes;
            }catch(Exception e){
                return null;
            }
        }).orElse(null);
   }
}
