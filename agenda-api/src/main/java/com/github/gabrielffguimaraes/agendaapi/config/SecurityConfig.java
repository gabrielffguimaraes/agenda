package com.github.gabrielffguimaraes.agendaapi.config;


import com.github.gabrielffguimaraes.agendaapi.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UsuarioService usuarioService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(usuarioService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf() // CSRF DESABILITANDO PARA UTILIZAR O OAUTH
                .disable()
                .cors()  // ATIVANDO O CORS
                .and() // VOLTANDO PARA O HTTP
                .sessionManagement() // DEFININDO CONFIGURACOES DE SESSAO
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS); // QUEBRANDO A SESSÃO POIS NÃO VOU USAR
    }

    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    protected PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }
}
