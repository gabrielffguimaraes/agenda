package com.github.gabrielffguimaraes.agendaapi.service;

import com.github.gabrielffguimaraes.agendaapi.model.entity.Usuario;
import com.github.gabrielffguimaraes.agendaapi.model.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {
    @Autowired
    private final UsuarioRepository usuarioRepository;

    public Usuario salvar(Usuario usuario){
        Optional<Usuario> user = this.usuarioRepository
                .verificarJaCadastrado(usuario.getUsuario());
        if(user.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Usuário já cadastrado .");
        }
        return this.usuarioRepository.save(usuario);
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Usuario usuario = this.usuarioRepository.
                verificarJaCadastrado(userName)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuário não encontrado"));

        return User.builder().
                username(usuario.getUsuario()).
                password(usuario.getSenha()).
                roles("USER").
                build();
    }
}
