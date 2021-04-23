import { ActivatedRoute, Router } from '@angular/router';
import { ContextPackService } from 'src/app/services/contextPack-service/contextpack.service';
import { Component, OnInit } from '@angular/core';
import { ContextPack } from 'src/app/datatypes/contextPacks';
import { WordList } from 'src/app/datatypes/wordlist';

@Component({
  selector: 'app-import-cp',
  templateUrl: './import-context-pack.component.html',
  styleUrls: ['./import-context-pack.component.scss']
})
export class ImportContextPackComponent implements OnInit {

  validFile: boolean;
  file: File;
  contextPack: ContextPack;
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  wordlist: Array<WordList>;

  constructor(private route: ActivatedRoute, private service: ContextPackService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
    });
  }

  onFileAdded(file) {
    this.file = file.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result;
      try {
        this.contextPack = JSON.parse(result as string);
        if (Array.isArray(this.contextPack)){
          this.validFile = false;
        } else {
          this.validFile = true;
        }
      } catch (err) {
        this.validFile = false;
      }
    };
    fileReader.readAsText(this.file);
  }

  save(){
    if(this.contextPack){
      this.service.addPack(this.contextPack).subscribe(_a => this.router.navigate([this.id]));
      return true;
    }
    else {return false;}
  }
}
