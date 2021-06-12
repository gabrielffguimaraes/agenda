package com.github.gabrielffguimaraes.agendaapi.model.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EnableAutoConfiguration
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String nome;

    @Column
    private String email;

    @Column
    private Boolean favorito;

    @Column
    private String telefone;

    @ManyToOne
    @JoinColumn(name="id_usuario",nullable = false)
    private Usuario usuario;

    @Column
    @Lob
    private byte[] foto;
}
