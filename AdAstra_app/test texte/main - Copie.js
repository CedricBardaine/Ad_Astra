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

    init: function() {
      this.chars = this.text.length;
      return this.write();

    },

    write: function() {
      
      if (this.index < this.chars) {
       
        this.letter = this.text.substr(this.index, 1);
        console.log(this.letter);
        console.log($(this.container));

        this.speed = 55;
        

        if(this.text.substr(this.index, 1) == "$") {
            $(this.container).html('');
            this.index++;
            this.counter = 0
        }
        


        if(this.text.substr(this.index-1, 1) == "§" && this.counter > 0) {
            
            this.speed = 450;
            $(this.container).append(".");
            this.counter++;

            if (this.counter > 3) {
              this.counter = 0
              this.index++;
            }
            
        }
        else if(this.text.substr(this.index-1, 1) == "£" && this.counter > 0) {
            
            this.speed = 250;
            $(this.container).append(" ");
            this.counter++;

            if (this.counter > 3) {
              this.counter = 0
              this.index++;
            }
            
        }
        else {
          if(this.letter == "§") {
            this.speed = 450;
            this.counter++;
          }
          else if(this.letter == "£") {
            this.speed = 250;
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