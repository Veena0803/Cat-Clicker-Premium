/*********** MODEL *************/

var model = {
  currentCat : null,
  cats: [
    {
      clickCount : 0,
      name : 'Tabby',
      imgSrc : "images/cat6.jpg"
    },
    {
      clickCount : 0,
      name : "Tiger",
      imgSrc : "images/cat7.jpg"
    },
    {
      clickCount : 0,
      name: "Emmie",
      imgSrc : "images/cat3.jpg"
    },
    {
      clickCount : 0,
      name: "Macy",
      imgSrc : "images/cat4.jpg"
    },
    {
      clickCount : 0,
      name : "Lucky",
      imgSrc : "images/cat5.jpg"
    }
  ]
};

/*********** CONTROLLER ************/
var controller = {
  init : function(){
    // set our current cat to the first one in the list
    model.currentCat = model.cats[0];
    
    
    //initializes our list of cats View and display of cats View
    catListView.init();
    catView.init();
    adminView.init();
  },
  
  displayForm :  function(form){
    form.style.display = "block";
  },
  hideForm : function(form){
    form.style.display = "none";
  },
  
  save : function(name, imgUrl, clicks){
    var cat = {
      clickCount : clicks,
      name : name,
      imgSrc : imgUrl
    }
    model.cats.push(cat);
    catListView.render();
    this.setCurrentCat(cat);
    catView.render();
  },
  
  getCurrentCat : function(){
    return model.currentCat;
  },
  
  getCats : function(){
    return model.cats;
  },
  
  setCurrentCat : function(cat){
    model.currentCat = cat;
  },
  
  incrementCounter : function(){
    model.currentCat.clickCount++;
    catView.render();
  }
}

/*********** VIEW **************/
var adminView = {
  init : function(){
    this.adminElem = document.getElementById('admin');
    this.cancelElem = document.getElementById('cancel');
    this.saveElem = document.getElementById('save');
    
    var formElem = document.getElementById('form');
    formElem.style.display = "none";
    
    this.adminElem.addEventListener('click', function(){
      controller.displayForm(formElem);
    });
    
    this.cancelElem.addEventListener('click', function(){
      controller.hideForm(formElem);
    });
    
    this.saveElem.addEventListener('click', function(){
      var name = document.getElementById('name').value;
      var imgUrl = document.getElementById('image').value;
      var clicks = document.getElementById('clicks').value;
      
      controller.save(name, imgUrl, clicks);
      controller.hideForm(formElem);
    
    });

  }
}

var catView = {
  init : function(){
    this.catElem = document.getElementById('cat');
    this.catElemName = document.getElementById('cat-name');
    this.catElemImage =  document.getElementById('cat-image');
    this.countElem = document.getElementById('cat-count');
    
    //increment cat's counter
    this.catElemImage.addEventListener('click',function(){
      controller.incrementCounter();
    });
  
    this.render();
  },

  render : function(){
    var currentCat = controller.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catElemName.textContent = currentCat.name;
    this.catElemImage.src = currentCat.imgSrc;
  }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cats-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },
    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the controller
        var cats = controller.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    controller.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
controller.init();
