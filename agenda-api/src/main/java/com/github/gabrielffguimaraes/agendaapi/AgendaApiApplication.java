package com.github.gabrielffguimaraes.agendaapi;

import com.github.gabrielffguimaraes.agendaapi.model.entity.Contato;
import com.github.gabrielffguimaraes.agendaapi.model.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AgendaApiApplication {
	@Bean
	public CommandLineRunner commandLineRunner(@Autowired ContatoRepository repository){
		return args -> {
			/*
			Contato contato = new Contato()
					.builder()
					.nome("biel")
					.email("biel@gmail.com")
					.favorito(true)
					.telefone("912315465")
					.build();
			repository.save(contato);
			*/
		};
	}
	@Bean
	public OpenAPI openAPI(@Value("AGENDA DE CONTATOS - API") String appDescription) {
		return new OpenAPI().info(new Info()
				.version("2.0")
				.title(appDescription)
				.termsOfService("http://swagger.io/terms")
				.license(new License().name("Apache 2.0").url("http://springdoc.org"))
		);
	}

	public static void main(String[] args) {
		SpringApplication.run(AgendaApiApplication.class, args);
	}
}
