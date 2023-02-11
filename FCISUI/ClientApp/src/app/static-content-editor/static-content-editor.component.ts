import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-static-content-editor',
  templateUrl: './static-content-editor.component.html',
  styleUrls: ['./static-content-editor.component.scss']
})
export class StaticContentEditorComponent implements OnInit {
  
  @Input() initialContent:string = "";
  @Output() onSave = new EventEmitter<string>();


  editorForm = this.fb.group({
    editorContent:''
  });

  constructor(private fb:FormBuilder) { 

  }

  ngOnInit(): void {
    this.editorForm.patchValue({editorContent:this.initialContent})
  }

  save() {
    const content = this.editorForm.get("editorContent")?.value || "";
    this.onSave.emit(content);
  }

}
