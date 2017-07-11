import { inject, TestBed } from '@angular/core/testing';
import { Broadcaster } from './broadcaster.service';

describe('Service: Broadcaster service', () => {

  let broadcaster: Broadcaster;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Broadcaster
      ]
    });
  });

  beforeEach(inject(
    [Broadcaster],
    (broadcast: Broadcaster) => {
      broadcaster = broadcast;
    }
  ));

  it('Broadcaster can successfully send and receive messages', (done) => {
    broadcaster.on('testEvent').subscribe((data: number) => {
      expect(data).toEqual(1001);
      done();
    });

    broadcaster.broadcast('testEvent', 1001);
  });
});

