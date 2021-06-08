package com.github.gabrielffguimaraes.agendaapi.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Columns;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   Integer id;
   @Column(nullable=false , length=255 , name="user" , unique=true)
   String usuario;
   @Column(nullable=false , length=255 , name="password")
   String senha;
}
