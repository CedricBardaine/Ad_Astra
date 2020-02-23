(function() {
  var app;

  $(document).ready(function() {
    return app.init();
  });

  app = {
    text: "Ici Ad Astra§  $Nous recevez-vous ?£ $ Allô ? Allô ?£ $Bon ok§ $[connexion rétablie]",
    index: 0,
    chars: 0,
    speed: 55,
    counter: 0,
    letter: "",
    container: ".text .content",

    chars_beg: '!<0>1-_/8[4]{}3—=+7*^9?#_', // 25 pour le moment
    counter_beg: 0,
    oldText: "",

    

    init: function() {
      this.chars = this.text.length;
      return this.write();

    },

    write: function() {
      
      if (this.index < this.chars) {
       
        this.letter = this.text.substr(this.index, 1);
        
        // console.log(this.letter);
        // console.log($(this.container));

        this.speed = 55;
        

        if(this.text.substr(this.index, 1) == "$") {
            $(this.container).html('');
            this.index++;
            this.counter = 0
        }
        


        if(this.text.substr(this.index-1, 1) == "§" && this.counter > 0) {
            
            this.speed = Math.floor((Math.random() * 450) + 350);
            $(this.container).append(".");
            this.counter++;

            if (this.counter > 3) {
              this.counter = 0
              this.index++;
            }
            
        }
        else if(this.text.substr(this.index-1, 1) == "£" && this.counter > 0) {
            
            this.speed = Math.floor((Math.random() * 300) + 200);
            $(this.container).append(" ");
            this.counter++;

            if (this.counter > 3) {
              this.counter = 0
              this.index++;
            }
            
        }
        else {
          if(this.letter == "§") {
            this.speed = Math.floor((Math.random() * 450) + 350);
            this.counter++;
          }
          else if(this.letter == "£") {
            this.speed = Math.floor((Math.random() * 300) + 200);
            this.counter++;}
          else{
            $(this.container).append(this.text[this.index]);
          }
          this.index++;
        }

        return window.setTimeout(function() {
          return app.write();
        }, this.speed);


      }
    }
  };

}).call(this);