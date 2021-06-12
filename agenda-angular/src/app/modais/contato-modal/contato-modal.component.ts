import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Contato} from '../../contato/contato';
@Component({
  selector: 'app-contato-modal',
  templateUrl: './contato-modal.component.html',
  styleUrls: ['./contato-modal.component.css']
})
export class ContatoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContatoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public contato: Contato
  ) {}

  ngOnInit(): void {
  }
  fechar(): void {
    this.dialogRef.close();
  }
}
