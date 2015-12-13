  $(document).ready(function () {
 
    var time;
    var $gunman = $('.content__gunman');
    
//  Функции для изменения цвета фона после
//  сообщений FIRE і You lost:
    var colorred = function changeOpacityOne() {
    $('.content__background').css('opacity', '0.6');
    };
    var colornormal = function changeOpacityTwo() {
    $('.content__background').css('opacity', '1');
    };
  
//  Функции, отвечающая за изменение поведения, в случаи попадания:
    var $myShot = function () {
      if (time) {
        clearTimeout(time);
      
      $message.empty().append(textGunman.t3);
      $message.show();
      $('<audio></audio>', {
        src: 'mus/shot.m4a',
        autoplay: 'autoplay'
      }).appendTo('body');
      $gunman.removeClass('gunman__take-gun');
      $gunman.addClass('gunman__drops');
      setTimeout(soundFunctionWin, 500);
      function soundFunctionWin() {
        $('<audio></audio>', {
          src: 'mus/win.m4a',
          autoplay: 'autoplay'
        }).appendTo('body');
        $('.footer__next').show();
      };
      
  
//Переключатель на следующий уровень:     //Переключатель на следующий уровень:  //Переключатель на следующий уровень:   
      $('.footer__next').one('click', function() {
      $('.content__alert').hide();
       colornormal();
       
          $('.header__timer').html('0.0');
          var levelNumber =  parseInt($('.footer__number-of-level').text());
          var newNumber = levelNumber + 1;
          $('.footer__number-of-level').text(newNumber);
           $gunman.removeClass('gunman__drops');
        setTimeout(nextLevel, 3000);
        function nextLevel() {

          
           $('<audio></audio>', {
         src: 'mus/intro (mp3cut.net).mp3',
         autoplay: 'autoplay',
         className: 'audio'
       }).appendTo('body');
      
      $gunman.addClass('gunman__move');
      setTimeout(gunmanStop, 4000);
      setTimeout(gunmanAlert, 5000, 't1');
      setTimeout(gunmanAlert, 7000, 't2');

          $('.footer__next').hide();
          
          };     
      });
      
//Подсчет заработанных денег:
      setTimeout(getMoney, 2500);
      function getMoney() {
         var k = parseInt($('.footer__amount-of-money').text());
         var b = k + ((8  - milisec) * 100);
      $('.footer__amount-of-money').empty();
      $('.footer__amount-of-money').append(b); 
      };   
       setTimeout(soundFunctionMoney, 2500);
       function soundFunctionMoney() {
       $('<audio></audio>', {
        src: 'mus/money.mp3',
        autoplay: 'autoplay'
      }).appendTo('body');
       };
    };
  };

//  СТАРТ игры, герой начинает движение:
    $('.start__game').on('click', function () {
      $('.intro').hide();
      $('<audio></audio>', {
        src: 'mus/intro (mp3cut.net).mp3',
        autoplay: 'autoplay',
        className: 'audio'
      }).appendTo('body');
      
      $gunman.addClass('gunman__move');
      setTimeout(gunmanStop, 4000);
      setTimeout(gunmanAlert, 5000, 't1');
      setTimeout(gunmanAlert, 7000, 't2');
    });
 
//  Ф-я, отвечающая за положение Ганмана в центре екрана:
    function gunmanStop() {
      $gunman.removeClass('gunman__move');
      $gunman.addClass('gunman__stop');
      $('<audio></audio>', {
        src: 'mus/mix_03s (audio-joiner.com).mp3',
        autoplay: 'autoplay',
      }).appendTo('body');
    };

//Обьект сообщений:    
    var textGunman = {
      't1': 'Are you ready?',
      't2': 'FIRE!!!',
      't3': 'You won!',
      't4': 'You lost...'
    };

//  ф-я для генерации сообщений и выстрел:
    function gunmanAlert(t) {
      var $message = $('.content__alert');
      $message.empty();
      $message.append(textGunman[t]);
      $message.show();
      if (t == 't2') {
        $gunman.removeClass('gunman__stop');
        $gunman.addClass('gunman__take-gun');
        milisec = 0;
        
        timer();
        $gunman.one('click', $myShot);
        $('<audio></audio>', {
          src: 'mus/fire.m4a',
          autoplay: 'autoplay',
        }).appendTo('body');     
      };
    };

//   ---TIMER---  
   
    var $message = $('.content__alert');
    var milisec = 0;
    var seconds = 0;

    function timer() {
      if (milisec == 8) {
        $message.empty().append(textGunman.t4);
        $message.show();
        $gunman.removeClass('gunman__take-gun');
        $gunman.removeClass('gunman__drops');
        $gunman.addClass('gunman__fail');
        $gunman.off('click', $myShot);
        clearTimeout(time);
        timer = null;
        $('<audio></audio>', {
          src: 'mus/death.m4a',
          autoplay: 'autoplay'
        }).appendTo('body');
        colorred();
        setTimeout(turnToStart, 7000);
        function turnToStart() {
           $('.intro').show();
           location.reload();
        };
        
      } else {
        milisec += 1;
        if (milisec == 1) {
           colorred();
        } else if (milisec == 2) {
           colornormal();
        } else if(milisec == 3) {
               colorred();    
        } else {
           colornormal();
        }; 
        $('#timer').empty().append(seconds + "." + milisec);
      }
      clearTimeout(time);
      time = setTimeout(timer, 100);
    };
    
  });