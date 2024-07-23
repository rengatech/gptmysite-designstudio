import { Injectable } from '@angular/core';
import { GPTMysiteStage } from 'src/assets/js/GPTMysite-stage.js';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';
import { scaleAndcenterStageOnCenterPosition } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  GPTMysiteStage: any;

  private logger: LoggerService = LoggerInstance.getInstance()
  constructor() { }


  initializeStage(){
    this.GPTMysiteStage = new GPTMysiteStage('tds_container', 'tds_drawer', 'tds_draggable');
  }

  setDrawer(){
    this.GPTMysiteStage.setDrawer();
  }

  centerStageOnPosition(pos){
    let intervalId = setInterval(async () => {
      const result = await this.GPTMysiteStage.centerStageOnPosition(pos);
      if (result === true) {
        clearInterval(intervalId);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);
  }

  centerStageOnTopPosition(pos){
    let intervalId = setInterval(async () => {
      const result = await this.GPTMysiteStage.centerStageOnTopPosition(pos);
      if (result === true) {
        clearInterval(intervalId);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);
  }

  centerStageOnHorizontalPosition(pos){
    let intervalId = setInterval(async () => {
      const result = await this.GPTMysiteStage.centerStageOnHorizontalPosition(pos);
      if (result === true) {
        clearInterval(intervalId);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);
  }


  setDragElement(elementId:string) {
    const element = document.getElementById(elementId);
    this.logger.log("[STAGE SERVICE] imposto il drag sull'elemento ", elementId, element);
    if(element)this.GPTMysiteStage.setDragElement(element);
  }
  

  physicPointCorrector(point){
    return this.GPTMysiteStage.physicPointCorrector(point);
  }


  async zoom(event: 'in' | 'out'){
    return await this.GPTMysiteStage.zoom(event);
    // return new Promise((resolve) => {
    //   const element = document.getElementById(elementId);
    //   let intervalId = setInterval(async () => {
    //     const result = await this.GPTMysiteStage.zoom(event, element);
    //     if (result === true) {
    //       clearInterval(intervalId);
    //       resolve(result);
    //     }
    //   }, 100);
    //   setTimeout(() => {
    //     clearInterval(intervalId);
    //     resolve(false);
    //   }, 1000);
    // });
  }

  scaleAndCenter(listOfintents){
    let resp = scaleAndcenterStageOnCenterPosition(listOfintents);
    return this.GPTMysiteStage.translateAndScale(resp.point, resp.scale);
    // this.logger.log('[CDS-CANVAS] moved-and-scaled ', el)
  }
  

  getScale(){
    return this.GPTMysiteStage.scale;
  }
}
