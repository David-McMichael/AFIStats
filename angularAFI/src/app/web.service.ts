import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Injectable()
export class WebService {
  stat_list: any;
  last_stat: any;
  fav_list: any;
  team_stat_list: any;
  userDetails: any;
  backup_stat_list: any;
  backup_team_stat_list: any;
  user_info: any;
  constructor(public http: HttpClient, public authService: AuthService) {}

  getStats() {
    return this.http
      .get('http://localhost:5000/api/v1.0/plays')
      .subscribe((response: any) => {
        this.stat_list = response;
        this.stat_list = _.orderBy(this.stat_list, ['id'], ['desc']);
        this.last_stat = this.stat_list[0];
        this.backup_stat_list = response;
      });
  }

  addPass(play: any) {
    if (play.Yards == '') {
      play.Yards = 0;
    }
    if (play.passStatus == 'IsIncomplete') {
      play.IsIncomplete = 1;
      play.Yards =0;
      if (play.Receiver == '') {
        play.Description = play.Passer + ' Incomplete Pass';
      } else {
        play.Description =
          play.Passer + ' Incomplete Pass Intended for ' + play.Receiver;
      }
    } else {
      play.IsIncomplete = 0;
      play.Description =
        play.Passer +
        ' Pass Completion to ' +
        play.Receiver +
        ' for ' +
        play.Yards +
        ' Yards';
    }
    if (play.passStatus == 'IsSack') {
      play.IsSack = 1;
      play.Description = play.Passer + ' Sacked for ' + play.Yards + ' Yards';
    } else {
      play.IsSack = 0;
    }
    if (play.passStatus == 'IsIntercepted') {
      play.IsInterception = 1;
      play.Description =
        play.Passer + ' Intercepted, Pass Intended for ' + play.Receiver;
    } else {
      play.IsInterception = 0;
    }
    let postData = new FormData();
    postData.append('id', 'play.id');
    postData.append('GameId', 'play.GameId');
    postData.append('GameDate', 'play.GameDate');
    postData.append('Quarter', 'play.Quarter');
    postData.append('Minute', 'play.Minute');
    postData.append('Second', 'play.Second');
    postData.append('OffenseTeam', 'play.OffenseTeam');
    postData.append('DefenseTeam', 'play.DefenseTeam');
    postData.append('Down', '1');
    postData.append('ToGo', '10');
    postData.append('YardLine', 'play.YardLine');
    postData.append('Passer', play.Passer);
    postData.append('Receiver', play.Receiver);
    postData.append('Tackler', 'play.Tackler');
    postData.append('AssistantTackler', 'play.AssistantTackler');
    postData.append('InterceptedBy', 'play.InterceptedBy');
    postData.append('SackedBy', 'play.SackedBy');
    postData.append('PenaltyOn', 'play.PenaltyOn');
    postData.append('Description', play.Description);
    postData.append('SeasonYear', 'play.SeasonYear');
    postData.append('Yards', play.Yards);
    postData.append('Formation', 'play.Formation');
    postData.append('PlayType', 'play.PlayType');
    postData.append('IsRush', 'play.IsRush');
    postData.append('IsPass', '1');
    postData.append('IsIncomplete', play.IsIncomplete);
    postData.append('IsTouchdown', 'play.IsTouchdown');
    postData.append('PassType', 'play.PassType');
    postData.append('IsSack', play.IsSack);
    postData.append('IsChallenge', 'play.IsChallenge');
    postData.append('IsChallengeReversed', 'play.IsChallengeReversed');
    postData.append('Challenger', 'play.Challenger');
    postData.append('IsMeasurement', 'play.IsMeasurement');
    postData.append('IsInterception', play.IsInterception);
    postData.append('IsFumble', 'play.IsFumble');
    postData.append('IsPenalty', 'play.IsPenalty');
    postData.append('IsTwoPointConversion', 'play.IsTwoPointConversion');
    postData.append(
      'IsTwoPointConversionSuccessful',
      'play.IsTwoPointConversionSuccessful'
    );
    postData.append('RushDirection', 'play.RushDirection');
    postData.append('YardLineFixed', 'play.YardLineFixed');
    postData.append('YardLineDirection', 'play.YardLineDirection');
    postData.append('IsPenaltyAccepted', 'play.IsPenaltyAccepted');
    postData.append('PenaltyTeam', 'play.PenaltyTeam');
    postData.append('IsNoPlay', 'play.IsNoPlay');
    postData.append('PenaltyType', 'play.PenaltyType');
    postData.append('PenaltyYards', 'play.PenaltyYards');
    postData.append('PassStatus', play.passStatus);

    return this.http
      .post('http://localhost:5000/api/v1.0/plays', postData)
      .subscribe((response) => {
        this.getStats();
      });
  }

  deletePass(currentID: any) {
    return this.http
      .delete('http://localhost:5000/api/v1.0/plays/' + currentID)
      .subscribe((response) => {
        this.getStats();
      });
  }

  editPass(play: any, currentID: any) {
    if (play.Yards == '') {
      play.Yards = 0;
    }
    if (play.passStatus == 'IsIncomplete') {
      play.IsIncomplete = 1;
      play.Yards =0;
      if (play.Receiver == '') {
        play.Description = play.Passer + ' Incomplete Pass';
      } else {
        play.Description =
          play.Passer + ' Incomplete Pass Intended for ' + play.Receiver;
      }
    } else {
      play.IsIncomplete = 0;
      play.Description =
        play.Passer +
        ' Pass Completion to ' +
        play.Receiver +
        ' for ' +
        play.Yards +
        ' Yards';
    }
    if (play.passStatus == 'IsSack') {
      play.IsSack = 1;
      play.Description = play.Passer + ' Sacked for ' + play.Yards + ' Yards';
    } else {
      play.IsSack = 0;
    }
    if (play.passStatus == 'IsIntercepted') {
      play.IsInterception = 1;
      play.Description =
        play.Passer + ' Intercepted, Pass Intended for ' + play.Receiver;
    } else {
      play.IsInterception = 0;
    }
    let postData = new FormData();
    postData.append('id', 'play.id');
    postData.append('GameId', 'play.GameId');
    postData.append('GameDate', 'play.GameDate');
    postData.append('Quarter', 'play.Quarter');
    postData.append('Minute', 'play.Minute');
    postData.append('Second', 'play.Second');
    postData.append('OffenseTeam', 'play.OffenseTeam');
    postData.append('DefenseTeam', 'play.DefenseTeam');
    postData.append('Down', '1');
    postData.append('ToGo', '10');
    postData.append('YardLine', 'play.YardLine');
    postData.append('Passer', play.Passer);
    postData.append('Receiver', play.Receiver);
    postData.append('Tackler', 'play.Tackler');
    postData.append('AssistantTackler', 'play.AssistantTackler');
    postData.append('InterceptedBy', 'play.InterceptedBy');
    postData.append('SackedBy', 'play.SackedBy');
    postData.append('PenaltyOn', 'play.PenaltyOn');
    postData.append('Description', play.Description);
    postData.append('SeasonYear', 'play.SeasonYear');
    postData.append('Yards', play.Yards);
    postData.append('Formation', 'play.Formation');
    postData.append('PlayType', 'play.PlayType');
    postData.append('IsRush', 'play.IsRush');
    postData.append('IsPass', '1');
    postData.append('IsIncomplete', play.IsIncomplete);
    postData.append('IsTouchdown', 'play.IsTouchdown');
    postData.append('PassType', 'play.PassType');
    postData.append('IsSack', play.IsSack);
    postData.append('IsChallenge', 'play.IsChallenge');
    postData.append('IsChallengeReversed', 'play.IsChallengeReversed');
    postData.append('Challenger', 'play.Challenger');
    postData.append('IsMeasurement', 'play.IsMeasurement');
    postData.append('IsInterception', play.IsInterception);
    postData.append('IsFumble', 'play.IsFumble');
    postData.append('IsPenalty', 'play.IsPenalty');
    postData.append('IsTwoPointConversion', 'play.IsTwoPointConversion');
    postData.append(
      'IsTwoPointConversionSuccessful',
      'play.IsTwoPointConversionSuccessful'
    );
    postData.append('RushDirection', 'play.RushDirection');
    postData.append('YardLineFixed', 'play.YardLineFixed');
    postData.append('YardLineDirection', 'play.YardLineDirection');
    postData.append('IsPenaltyAccepted', 'play.IsPenaltyAccepted');
    postData.append('PenaltyTeam', 'play.PenaltyTeam');
    postData.append('IsNoPlay', 'play.IsNoPlay');
    postData.append('PenaltyType', 'play.PenaltyType');
    postData.append('PenaltyYards', 'play.PenaltyYards');
    postData.append('PassStatus', play.passStatus)

    console.log(postData, play.id);
    return this.http
      .put('http://localhost:5000/api/v1.0/plays/' + currentID, postData)
      .subscribe((response) => {
        this.getStats();
      });
  }
}
