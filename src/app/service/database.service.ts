import { Injectable } from '@angular/core';
import { CapacitorDataStorageSqlite } from 'capacitor-data-storage-sqlite';
import { Device } from '@capacitor/device';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  _modificationTime: any;
  public tblModificationTime: string = 'modificationTime';
  _patients: any;
  public tblPatients: string = 'patients';
  _treatments: any;
  public tblTreatments: string = 'treatments';
  _data: any;
  public tblData: string = 'data';
  _groups: any;
  public tblGroups: string = 'groups';
  _userInfo: any;
  public tblUserInfo: string = 'userInfo';
  _tests: any;
  public tblTests: string = 'tests';
  _notifications: any;
  public tblNotifications: string = 'notifications';
  _templates: any;
  public tblTemplates: string = 'templates';
  _topics: any;
  public tblTopics: string = 'topics';
  _subTopics: any;
  public tblSubTopics: string = 'subTopics';
  _exams: any;
  public tblExams: string = 'exams';
  _prizes: any;
  public tblPrizes: string = 'prizes';
  _history: any;
  public tblHistory: string = 'history';
  _subscription: any;
  public tblSubscription: string = 'subscription';
  _achievements: any;
  public tblAchievements: string = 'achievements';

  dbName: string;

  constructor() {
    this.dbName = 'Kala_Charitable';
  }

  init() {
    var promise = new Promise<void>(async (resolve, reject) => {
      await Device.getInfo().then((info: any) => {
        console.log('Initializing Database service');
        this._patients = CapacitorDataStorageSqlite;
        this._treatments=CapacitorDataStorageSqlite;
        this._data = CapacitorDataStorageSqlite;
      });
      resolve();
    });
    return promise;
  }

  setData(Id: string, value: any) {
    var promise = new Promise<void>((resolve, reject) => {
      this._data
        .openStore({ database: this.dbName, table: this.tblData})
        .then(() => {
          this._data.set({
            key: Id,
            value: JSON.stringify(value),
          });
          resolve();
        });
    });
    return promise;
  }
  getData() {
    var promise = new Promise((resolve) => {
      let arr: any = {};
      this._data
        .openStore({ database: this.dbName, table: this.tblData })
        .then(() => {
          console.log('Fetching Patients');
          this._data.keysvalues().then((data: any) => {
            data.keysvalues.forEach((k: any) => {
              arr[k.key] = JSON.parse(k.value);
            });
            resolve(arr);
          });
        });
    });
    return promise;
  }
  delData(Id: string) {
    var promise = new Promise<void>((resolve, reject) => {
      this._data
        .openStore({ database: this.dbName, table: this.tblData})
        .then(() => {
          this._data.remove({ key: Id });
          resolve();
        });
    });
    return promise;
  }
  setTreatments(Id: string, treatment: any) {
    var promise = new Promise<void>((resolve, reject) => {
      this._treatments
        .openStore({ database: this.dbName, table: this.tblTreatments })
        .then(() => {
          this._treatments.set({
            key: Id,
            value: JSON.stringify(treatment),
          });
          resolve();
        });
    });
    return promise;
  }

  getSingleTreatments(id:string) {
    var promise = new Promise((resolve) => {
      let arr: any = {};
      this._treatments
        .openStore({ database: this.dbName, table: this.tblTreatments })
        .then(() => {
          console.log('Fetching treatments');
          this._treatments.keysvalues().then((data: any) => {
            data.keysvalues.forEach((k: any) => {
              if(k.key===id){
              arr[k.key] = JSON.parse(k.value);}
            });
            resolve(arr);
          });
        });
    });
    return promise;
  }

  getTreatments() {
    var promise = new Promise((resolve) => {
      let arr: any = {};
      this._treatments
        .openStore({ database: this.dbName, table: this.tblTreatments })
        .then(() => {
          console.log('Fetching treatments');
          this._treatments.keysvalues().then((data: any) => {
            data.keysvalues.forEach((k: any) => {
              arr[k.key] = JSON.parse(k.value);
            });
            resolve(arr);
          });
        });
    });
    return promise;
  }

  delTreatments(Id: string) {
    var promise = new Promise<void>((resolve, reject) => {
      this._treatments
        .openStore({ database: this.dbName, table: this.tblTreatments })
        .then(() => {
          this._treatments.remove({ key: Id });
          resolve();
        });
    });
    return promise;
  }

  setPatients(patientId: string, patient: any) {
    console.log(patientId);
    console.log(patient);
    var promise = new Promise<void>((resolve, reject) => {
      this._patients
        .openStore({ database: this.dbName, table: this.tblPatients })
        .then(() => {
          this._patients.set({
            key: patientId,
            value: JSON.stringify(patient),
          });
          resolve();
        });
    });
    return promise;
  }

  getSinglePatients(id:string) {
    var promise = new Promise((resolve) => {
      let arr: any = {};
      this._patients
        .openStore({ database: this.dbName, table: this.tblPatients })
        .then(() => {
          console.log('Fetching Patients');
          this._patients.keysvalues().then((data: any) => {
            data.keysvalues.forEach((k: any) => {
              if(k.key===id){
              arr[k.key] = JSON.parse(k.value);}
            });
            resolve(arr);
          });
        });
    });
    return promise;
  }

  getPatients() {
    var promise = new Promise((resolve) => {
      let arr: any = {};
      this._patients
        .openStore({ database: this.dbName, table: this.tblPatients })
        .then(() => {
          console.log('Fetching Patients');
          this._patients.keysvalues().then((data: any) => {
            data.keysvalues.forEach((k: any) => {
              arr[k.key] = JSON.parse(k.value);
            });
            resolve(arr);
          });
        });
    });
    return promise;
  }

  delPatient(patientId: string) {
    var promise = new Promise<void>((resolve, reject) => {
      this._patients
        .openStore({ database: this.dbName, table: this.tblPatients })
        .then(() => {
          this._patients.remove({ key: patientId });
          resolve();
        });
    });
    return promise;
  }
  

  async clear() {
    console.log('Clearing ', this.tblPatients);
    await this._patients
      .openStore({ database: this.dbName, table: this.tblPatients })
      .then(() => {
        this._patients.clear();
      });
    console.log('Clearing ', this.tblData);
    await this._data
      .openStore({ database: this.dbName, table: this.tblData })
      .then(() => {
        this._data.clear();
      });
    console.log('Clearing ', this.tblTreatments);
    await this._treatments
      .openStore({ database: this.dbName, table: this.tblTreatments })
      .then(() => {
        this._treatments.clear();
      });
  }

  // async reset() {
  //   await this.clear();
  //   console.log('Clearing ', this.tblUserInfo);
  //   await this._userInfo
  //     .openStore({ database: this.dbName, table: this.tblUserInfo })
  //     .then(() => {
  //       this._userInfo.clear();
  //     });
  //   console.log('Clearing ', this.tblSubscription);
  //   await this._subscription
  //     .openStore({ database: this.dbName, table: this.tblSubscription })
  //     .then(() => {
  //       this._subscription.clear();
  //     });
  //   console.log('Clearing ', this.tblAchievements);
  //   await this._achievements
  //     .openStore({ database: this.dbName, table: this.tblAchievements })
  //     .then(() => {
  //       this._achievements.clear();
  //     });
  //   console.log('Clearing ', this.tblGroups);
  //   await this._groups
  //     .openStore({ database: this.dbName, table: this.tblGroups })
  //     .then(() => {
  //       this._groups.clear();
  //     });
  //   console.log('Resetting modification time');
  //   this._modificationTime
  //     .openStore({ database: this.dbName, table: this.tblModificationTime })
  //     .then(async () => {
  //       await this._modificationTime.keys().then(async (data: any) => {
  //         const d = new Date(0).toISOString();
  //         for (let r of data.keys) {
  //           await this._modificationTime.set({ key: r, value: d });
  //         }
  //       });
  //     });
  // }

  async removeAll() {
    await this._patients
      .openStore({ database: this.dbName, table: this.tblPatients })
      .then(() => {
        this._patients.deleteStore({ database: this.dbName });
      });
    await this._tests
      .openStore({ database: this.dbName, table: this.tblTests })
      .then(() => {
        this._tests.deleteStore({ database: this.dbName });
      });
    await this._modificationTime
      .openStore({ database: this.dbName, table: this.tblModificationTime })
      .then(() => {
        this._modificationTime.deleteStore({ database: this.dbName });
      });
    await this._userInfo
      .openStore({ database: this.dbName, table: this.tblUserInfo })
      .then(() => {
        this._userInfo.deleteStore({ database: this.dbName });
      });
    await this._notifications
      .openStore({ database: this.dbName, table: this.tblNotifications })
      .then(() => {
        this._notifications.deleteStore({ database: this.dbName });
      });
    await this._templates
      .openStore({ database: this.dbName, table: this.tblTemplates })
      .then(() => {
        this._templates.deleteStore({ database: this.dbName });
      });
    await this._topics
      .openStore({ database: this.dbName, table: this.tblTopics })
      .then(() => {
        this._topics.deleteStore({ database: this.dbName });
      });
    await this._subTopics
      .openStore({ database: this.dbName, table: this.tblSubTopics })
      .then(() => {
        this._subTopics.deleteStore({ database: this.dbName });
      });
      await this._exams
      .openStore({ database: this.dbName, table: this.tblExams })
      .then(() => {
        this._exams.deleteStore({ database: this.dbName });
      });
    await this._history
      .openStore({ database: this.dbName, table: this.tblHistory })
      .then(() => {
        this._history.deleteStore({ database: this.dbName });
      });
    await this._prizes
      .openStore({ database: this.dbName, table: this.tblPrizes })
      .then(() => {
        this._prizes.deleteStore({ database: this.dbName });
      });
    await this._subscription
      .openStore({ database: this.dbName, table: this.tblSubscription })
      .then(() => {
        this._subscription.deleteStore({ database: this.dbName });
      });
    await this._achievements
      .openStore({ database: this.dbName, table: this.tblAchievements })
      .then(() => {
        this._achievements.deleteStore({ database: this.dbName });
      });
    await this._groups
      .openStore({ database: this.dbName, table: this.tblGroups })
      .then(() => {
        this._groups.deleteStore({ database: this.dbName });
      });
  }
}


