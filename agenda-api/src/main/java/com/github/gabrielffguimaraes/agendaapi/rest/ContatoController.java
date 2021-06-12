package com.github.gabrielffguimaraes.agendaapi.rest;


import com.github.gabrielffguimaraes.agendaapi.model.entity.Contato;
import com.github.gabrielffguimaraes.agendaapi.model.entity.Usuario;
import com.github.gabrielffguimaraes.agendaapi.model.repository.ContatoRepository;
import com.github.gabrielffguimaraes.agendaapi.model.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
public class ContatoController {
    private final ContatoRepository contatoRepository;
    private final UsuarioRepository usuarioRepository;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contato save (
        @RequestParam("nome") String nome,
        @RequestParam("email") String email,
        @RequestParam("favorito") Boolean favorito,
        @RequestParam("telefone") String telefone,
        @RequestParam("foto") Part foto,
        @RequestParam("user_name") String user_name
    )
    {
        Usuario usuario = usuarioRepository.findByUsuario(user_name);
        Contato contatoRetorno = null;
        try {

            byte[] bytes = new byte[(int) foto.getSize()];
            InputStream is = foto.getInputStream();
            IOUtils.readFully(is, bytes);
            Contato contato = new Contato().
                    builder().
                    nome(nome).
                    email(email).
                    favorito(favorito).
                    telefone(telefone).
                    foto(bytes).
                    usuario(usuario).
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
        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Contato nao encotrado ."));
    }

    /*@GetMapping
    public Page<Contato> listarTodos(
            @RequestParam(value="page" , defaultValue = "0") Integer pagina,
            @RequestParam(value="size" , defaultValue = "10") Integer tamanhoPagina,
            @RequestParam(value="user_name") String user_name
        ){
        PageRequest pageRequest = PageRequest.of(pagina , tamanhoPagina);
        return this.contatoRepository.findAll(pageRequest);
    }*/
    @GetMapping
    public Page<Contato> listarTodos(
            @RequestParam(value="page" , defaultValue = "0") Integer pagina,
            @RequestParam(value="size" , defaultValue = "10") Integer tamanhoPagina,
            @RequestParam(value="user_name") String user_name
    ){
        Usuario usuario = this.usuarioRepository.findByUsuario(user_name);
        PageRequest pageRequest = PageRequest.of(pagina , tamanhoPagina);
        return this.contatoRepository.findAllByUsuario(usuario,pageRequest);
    }

    @GetMapping("{id}")
    public Contato pegarPorId (@PathVariable Integer id) {
        return this.contatoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"contato não encontrado ."));
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
    @PutMapping("{id}")
    public Contato editarContato(@PathVariable("id") Integer id,
                                 @RequestParam("nome") String nome,
                                 @RequestParam("email") String email,
                                 @RequestParam("favorito") Boolean favorito,
                                 @RequestParam("telefone") String telefone,
                                 @RequestParam("foto") Part foto){
        try {
            String temFoto = foto.getSubmittedFileName();
            byte[] fotoAtualizada = new byte[(int) foto.getSize()]; // CARREGA O ARRAY DE BYTE EM MEMORIA

            InputStream is = foto.getInputStream(); // DECLARA UM INPUTSTREM PARA SER LIDO
            IOUtils.readFully(is , fotoAtualizada); // METODO PARA CARREGAR MEU INPUTSTREAM DA FOTO DENTRO DO ARRAY DE BYTES VAZIO
            is.close(); // FECHANDO O INPUT STREAM ABERTO
            Contato contato = new Contato();
            return this.contatoRepository.findById(id).map( c -> {
                c.setId(id);
                c.setNome(nome);
                c.setEmail(email);
                c.setFavorito(favorito);
                c.setTelefone(telefone);
                if(temFoto != null) {
                    c.setFoto(fotoAtualizada);
                }
                return this.contatoRepository.save(c);
            }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"contato não encontrado"));
        } catch( Exception e){
            return null;
        }
    }
}
