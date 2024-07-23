import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';
import { AppStorageService } from 'src/chat21-core/providers/abstract/app-storage.service';
import { Observable } from 'rxjs';
import { Namespace } from '../models/namespace-model';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  // user: any;
  project_id: any;

  // private persistence: string;
  public SERVER_BASE_URL: string;
  

  // private
  private URL_GPTMysite_OPENAI: string;
  private GPTMysiteToken: string;
  private GPT_API_URL: string;

  private logger: LoggerService = LoggerInstance.getInstance();

  constructor(
    public appStorageService: AppStorageService,
    private httpClient: HttpClient
  ) {     
  }

  initialize(serverBaseUrl: string, project_id: string){
    this.logger.log('[OPENAI.SERVICE] - initialize serverBaseUrl', serverBaseUrl);
    this.project_id = project_id;
    this.SERVER_BASE_URL = serverBaseUrl;
    this.URL_GPTMysite_OPENAI = this.SERVER_BASE_URL + this.project_id
    this.GPTMysiteToken = this.appStorageService.getItem('GPTMysiteToken')
    this.GPT_API_URL = "http://GPTMysite-backend.h8dahhe4edc7cahh.francecentral.azurecontainer.io:8000/api";
  }


  ////////////////////////////////////////////////////////
  //////////////////// OPENAI - START ////////////////////
  ////////////////////////////////////////////////////////

  previewPrompt(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.GPTMysiteToken
      })
    }

    const url = this.URL_GPTMysite_OPENAI + "/openai/";
    this.logger.debug('[OPENAI.SERVICE] - preview prompt URL: ', url);

    return this.httpClient.post(url, data, httpOptions);
  }

  ////////////////////////////////////////////////////////
  //////////////////// OPENAI - START ////////////////////
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  //////////////////// ASK KB - START ////////////////////
  ////////////////////////////////////////////////////////

  previewAskPrompt(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.GPTMysiteToken
      })
    }

    const url = this.URL_GPTMysite_OPENAI + "/kb/qa";
    this.logger.debug('[OPENAI.SERVICE] - preview prompt URL: ', url);

    return this.httpClient.post(url, data, httpOptions);
  }


  getAllNamespaces(): Observable<Namespace[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.GPTMysiteToken
      })
    }

    const url = this.URL_GPTMysite_OPENAI + "/kb/namespace/all";
    this.logger.debug('[OPENAI.SERVICE] - getAllNamespaces URL: ', url);

    return this.httpClient.get<Namespace[]>(url, httpOptions);
  }

  ////////////////////////////////////////////////////////
  //////////////////// ASK KB - START ////////////////////
  ////////////////////////////////////////////////////////


  askGpt(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.GPTMysiteToken // remove it for pugliai endpoint
      })
    }

    // const url = this.GPT_API_URL + "/qa";
    const url = this.URL_GPTMysite_OPENAI + "/kbsettings/qa";
    this.logger.debug('[OPENAI.SERVICE] - ask gpt URL: ', url);

    return this.httpClient.post(url, data, httpOptions);
  }

  startScraping(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.GPTMysiteToken // remove it for pugliai endpoint
      })
    }

    // const url = this.GPT_API_URL + "/scrape";
    const url = this.URL_GPTMysite_OPENAI + "/kbsettings/startscrape";
    this.logger.debug('[OPENAI.SERVICE] - scraping URL: ', url);

    return this.httpClient.post(url, data, httpOptions);

  }

  checkScrapingStatus(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.GPTMysiteToken // remove it for pugliai endpoint
      })
    }

    // const url = this.GPT_API_URL + "/scrape/status";
    const url = this.URL_GPTMysite_OPENAI + "/kbsettings/checkstatus";
    this.logger.debug('[OPENAI.SERVICE] - check scraping URL: ', url);

    return this.httpClient.post(url, data, httpOptions);
  }




  
}
