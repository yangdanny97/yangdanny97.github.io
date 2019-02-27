
var names = ['Justin Sink', 'Howard Fineman', 'Michelle Malkin', 'Paul Singer', 'Peggy Noonan', 'David Shepardson', 'Susan Joan Archer', 'Susan Page', 'Alex Leary', 'John Harwood', 'john r stanton', 'E!!', 'Michael Roston', 'Scott Wong', 'Amy Chozick', 'Arianna Huffington', 'Kevin Robillard', 'Juana Summers Markland', 'Paul Lewis', 'michaelscherer', 'Josh Hafner', 'Sean Hannity', 'SarahBakerNBC', 'Maeve Reston', 'Patricia DiCarlo', 'Ron Fournier', 'MATT DRUDGE', 'Max Fisher', 'Michael D. Shear', 'Christina Wilkie', 'Roger Simon', 'Frank Thorp V', 'Mike Allen', 'Madeline Marshall', 'HowardKurtz', "Mike O'Brien", 'Michael McAuliff', 'Steve Contorno', 'Chris Suellentrop', 'Anna Palmer', 'Jonathan Strong', 'Tom Curry', 'John Berman', 'Jamie Dupree', 'Adam Smith', 'Matt Lewis', 'Ann Coulter', 'Steven Shepard', 'Jon Ralston', 'Caroline Horn', 'Bill Keller', 'Michelle Jaconi', 'James Bennet', 'Russell Berman', 'Aaron Blake', 'Dan Balz', 'Jeffrey Young', 'Joe McQuaid', 'David S. Joachim', 'O. Kay Henderson', 'Julie Bosman', 'Ken Thomas', 'Matt Fuller', 'Reid J. Epstein', 'Reid Cherlin', 'Shawna Thomas', 'Steve Bousquet', 'Steve Benen', 'Kyle Kondik', 'John Bresnahan', 'Paul Kane', 'Jessica Yellin', 'Mark Benjamin', 'Alicia M. Cohn', 'Major Garrett', 'Ryan Lizza', 'Melinda Henneberger', 'Ben Jacobs', 'Josh Kraushaar', 'Glenn Greenwald', 'Jordan Fabian', 'Katie Smith Allen', 'Sam Stein', 'Abby D. Phillip', 'Bob Cohn', 'Patricia Murphy', 'Steven Portnoy', 'Dana Bash', 'Nicholas Jackson', 'Manu Raju', 'Julie Davis', 'Terry Moran', 'Michael Falcone', 'Dave Wasserman', 'Megan Carpentier', 'Andrew Rafferty', 'Marc Ambinder', 'lucy morgan', 'Bret Baier', 'Nick Valencia', 'Karen Tumulty', 'Jim Acosta', 'Arlette Saenz', 'George Bennett', 'Matt Stiles', 'amy walter', 'Scott Bland', 'Steve Sebelius', 'Dan Eggen', 'Shira T. Center', 'John Dickerson', 'Katharine Q. Seelye', 'Carrie Dann', 'Neda Semnani', 'Cameron Joseph', 'Jennifer Duffy', 'Chris Moody', 'Olivier Knox', 'Cook Political Report', 'Peter Hamby', 'Trish Turner', 'Walter Shapiro', 'Michael Hirsh', 'Philip Rucker', 'Neil King', 'carl hulse', 'Sara Murray', 'Jonathan Capehart', 'Byron Tau', 'Emily Pierce', 'Elahe Izadi', 'Matthew Daly', 'Melissa Harris-Perry', 'James Hohmann', 'Matt Vasilogambros', 'Elizabeth Titus', 'Kasie Hunt', 'Lisa Desjardins', 'Thomas DeFrank', 'Bob Cusack', 'Beth Reinhard', 'Jessica Taylor', 'Annie Karni', 'Michael C. Bender', 'Steven Ginsberg', 'Steve Peoples', 'David Wastell', 'Ann Curry', 'Josh', 'Lauren Fox', 'George Stephanopoulos', 'Daniel', 'Glenn Thrush', 'Larry Sabato', 'Jeremy W. Peters', 'Joshua Green', 'Betsy Fischer Martin', 'Steven Dennis', 'Rick Dunham', 'David Mark', 'Anderson Cooper', 'Reid Wilson', 'Rebecca Berg', 'Charles Krauthammer', 'Emma Dumain', 'Charles Dharapak', 'Phil Elliott', 'Jennifer Bendery', 'Jonathan Martin', 'Rick Klein', 'Amanda Muoz-Temple', 'Nate Silver', 'Mark Z. Barabak', 'AP Politics', 'Robert Yoon', 'Ali Rogin', 'devindwyer', 'Anjeanette Damon', 'Paul Krugman', 'Jeff Zeleny', 'Dave Levinthal', 'Henry C.J. Jackson', 'Tom Bevan', 'David A. Graham', 'Rachel Rose Hartman', 'John Gizzi', 'Jeremy P. Jacobs', 'Amy Gardner', 'Kate Nocera', 'Eliot Nelson', 'Bob Schieffer', 'Mark Murray', 'Dan Merica', 'Michael Crowley', 'Jose A. Del Real', "P. J. O'Rourke", 'Holly Ramer', 'Shannon Travis', 'Marin Cogan', 'Adam Wollner', 'Perry Bacon Jr.', 'Taegan Goddard', 'Ted Bridis', 'Jill Abramson', 'Patrick W. Gavin', 'Jo Ling Kent', 'David Nakamura', 'Deirdre Walsh', 'Caitlin Huey-Burns', 'Joe Scarborough', 'Natalie Jennings', 'Dan Nowicki', 'Kevin Brennan', 'Susan Davis', 'Amie Parnes', 'Ron Lieber', 'Rosalind Helderman', 'bonney', 'Kenneth P. Vogel', 'Rachel Streitfeld', 'Matthew Keys', 'Felix Salmon', 'Alex Parker', 'Maggie Haberman', 'Benny', 'CNN Political Ticker', 'andrew kaczynski', 'Erin McPike', 'Dan Hirschhorn', 'Domenico Montanaro', 'Leslie Larson Caimi', 'Amy Harder', 'Donna Brazile', 'Dylan Byers', 'Katie Zezima', "Ed O'Keefe", 'Alex Roarty', 'Dan Berman', 'AnnGerhart', 'Julie Mason', 'Dan Lothian', 'Patrick LaForge', 'Maggie', 'David M. Drucker', "Adam O'Neal", 'Laura E. Davis', 'Kevin Bohn', 'Ed Henry', 'Nathan Gonzales', 'Adam B. Kushner', 'Alexis Simendinger', 'Megyn Kelly', 'Alexandra Jaffe', 'Rachel Maddow MSNBC', 'Matt Wuerker', 'Aaron Gould Sheinin', 'Troy Kinsey', 'Peter Baker', 'Jenny Blanco', 'Gregg Birnbaum', 'Josh Gerstein', 'Terence Samuel', 'Burgess Everett', 'Charlie Mahtesian', 'Dana Perino', 'Emily Heil', 'Jamie Kirchick', 'Megan McArdle', 'Susan Ferrechio', 'Wolf Blitzer', 'melissa block', 'Jamie Gray', 'Kathie Obradovich', 'Shushannah Walshe', 'PETER MAER', 'Jonathan Allen', 'Ed Hornick', 'Ethan Klapper', 'Carl Cannon', 'Tim Alberta', 'Robert Costa', 'Carol Lee', 'Gabriel Debenedetti', 'Todd Zwillich', 'Anita Kumar', 'Matt Viser', 'Jeffrey Goldberg', 'George Condon', 'Donovan Slack', 'Josh Lederman', 'Alex Brown', 'Jordan J Frasier', "Patrick O'Connor", 'Beth Fouhy', 'Jason Horowitz', 'McKay Coppins', 'Kathleen Hennessey', 'Dick Stevenson', 'Chris Licht', 'Jim Roberts', 'Savannah Guthrie', 'Vaughn Sterling', 'Greta Van Susteren', 'Andrew Malcolm', 'Marty Kady', 'Andrea Mitchell', 'Niels Lesniewski', 'Chris Cillizza', 'Dana Milbank', 'Julie Pace', 'Taylor West', 'Colleen Nelson', 'Joe Hagan', 'Nick Corasaniti', 'Christian Heinze', 'Holly Bailey', 'Karen Travers', 'Dave Weigel', 'Mark Joyella', 'Tim Grieve', 'David Freedlander', 'Emma V. Angerer', 'David Muir', 'Tom Diemer', 'Eamon Javers', 'Eliza Newlin Carney', 'Michael Barbaro', 'Adriel Bettelheim', 'Aman Batheja', 'Edward-Isaac Dovere', 'Jan Crawford', 'David Catanese', 'Emily C. Singer', 'Molly Ball', 'Glenn Beck', 'Gabriel Sherman', 'Carol Costello', 'Mike Memoli', 'michael viqueira', "John O'Connor", 'Mark Preston', 'Judy Kurtz', 'Chris Stirewalt', 'Jesse Rodriguez', 'Sean Geary Higgins', 'Jennifer Epstein', 'Garance Franke-Ruta', 'Hadas Gold', 'Lauren Whittington', 'Jonathan Karl', 'jodikantor', 'Brianna Keilar', 'Fareed Zakaria', 'JonathanWeisman', 'Jamie Novogrod', 'Mark Leibovich', 'Lloyd Grove', 'ryan teague beckwith', 'Stephanie Ebbert', 'Jill Jackson', 'Chuck Todd', 'Alex Burns', 'Alex Bolton', 'Ashley Parker', 'Rebecca Shabad', 'Jonathan Easley', 'NYT Politics', 'Mark Halperin', 'David Leonhardt', 'Abby Livingston', 'Patricia Zengerle', "Kelly O'Donnell", 'Lauren S. Camera', 'Scott Wilson', 'Alex Pappas', 'Marc Fortier', 'Ben Adler', 'Alexander Mooney', 'Paul Steinhauser', 'Sam Youngman', 'Alex Moe', 'Scott Conroy', 'Jill Lawrence', 'Jenna Sakwa', 'National Journal', 'Luke Russert', 'Mike Barnicle', 'Jennifer Jacobs', 'Jake Sherman', 'Chris Hayes', 'Sean Sullivan', 'David Chalian', 'Felicia Sonmez', 'Peter Foster', 'Jake Tapper', 'Stuart Rothenberg', 'Ben Leubsdorf', 'Marc Caputo', 'Sarah Huisenga', 'Mark Knoller', 'Adam Beam', "Bill O'Reilly", 'James Pindell', 'Meredith Shiner', 'Mackenzie Weinger', 'Julie Sobel', 'Jay Newton-Small', 'Glen Johnson', 'Rebecca Kaplan', 'Brooke Brower', '2016 Iowa Caucuses', 'Nikole Killion', 'Jackie Kucinich', 'Ben Smith', 'Chad Pergram', 'Kate Tummarello', 'Jim Geraghty', 'Emily Schultheis', 'Christiane Amanpour', 'Jon Resnick DJI', 'jimrutenberg', 'jack healy', 'Steve Holland', 'Pema Levy', 'Nick Confessore', 'Drew Cline', 'Ginger Gibson', "Norah O'Donnell", 'Sarah Mimms', 'Ryan Murphy', 'Lisa Lerer', 'Zeke Miller'];
var influential = ['Matt Drudge', 'Ann Coulter', 'Megyn Kelly', 'Maggie Haberman', 'Andrea Mitchell', 'Wolf Blitzer', 'Christiane Amanpour', 'Donna Brazile', 'Fareed Zakaria', 'Sean Hannity', 'Mark Knoller', 'Charles Krauthammer', 'Dana Perino', "Bill O'Reilly", 'Arianna Huffington', 'Joe Scarborough', "Norah O'Donnell", 'Ann Curry', 'David Frum', 'Jonathan Martin', 'Bret Baier', 'Ezra Klein', 'Melissa Harris-Perry', 'Glenn Beck', 'GeorgeStephanopoulos', 'Paul Krugman', 'Nicholas Kristof', 'Ed Henry', 'Rachel Maddow MSNBC', 'Glenn Greenwald', 'Greta Van Susteren', 'Michelle Malkin', 'HowardKurtz', 'Sam Stein', 'Anderson Cooper', 'Jake Tapper', 'Brian Stelter', 'Andrew Malcolm', 'Chris Cillizza', 'Mike Allen', 'Dave Weigel', 'Ben Smith', 'Dana Loesch', 'Chris Hayes'];


var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

//defining force directed layout
var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(-30))
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(30))
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2))
    .on("tick", ticked);

var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");

var nodes = [];
var links = [];
var data;
var rawdata;
var selected;

//initializing nodes
for (var i = 0; i<432; i++){
  var r1 = Math.floor(Math.random()*200);
  var r2 = Math.floor(Math.random()*200);
  nodes.push({"id":"Node"+i.toString(), "x":300 + r1, "y": 300+r2, "num": i});
}

//tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

//simulation reset function
function sim(threshold){
  links = [];
  data = d3.csvParseRows(rawdata, function(row){
    var rowData = row.map(x => Number(x));
    var max_i = 0;
    var max = rowData[0];
    for (var i = 0; i < rowData.length; i++){
      if (rowData[i]>max && rowData[i]<1) {max = rowData[i]; max_i = i;}
    }
    if(max == 0) {max_i = -1};
    return rowData.map(function(x,i){
        if (x > threshold || i == max_i){return 1;} else {return 0;}
      });
  });
  for (var i = 0; i < 432; i++){
    for (var j = 0; j < 432; j++){
      if (data[i][j] == 1 && i != j) {
        links.push({"source" : "Node"+i.toString(), "target" : "Node"+j.toString()});
      }
    }
  }
  
  link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
  link.exit().remove();

  link = link
    .data(links)
    .enter().append("line")
    .attr("class", "link").merge(link);

  simulation.force("link").links(links);

  node.attr("fill", function(d){
    var name = names[d.num];
    if (name == selected){
      return "yellow";
    }
    else if (influential.includes(name)){
      return "red";
    } else { 
      return "gray";
    }
  });
  simulation.alpha(1).restart(); 
}

//loading data
d3.text("similarity.csv",function(error,csvdata){
  rawdata = csvdata;
  node = node
  .data(nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("r", 6)
    .attr("fill", function(d){
      var name = names[d.num];
      if (influential.includes(name)){
        return "red";
      } else { return "gray";}
    })
    .on("mouseover", function(d) {
        div.transition()    
        .duration(250)    
        .style("opacity", 0.9);      
        div.html(names[d.num])  
          .style("left", (d3.event.pageX) + "px")   
          .style("top", (d3.event.pageY - 28) + "px");  
        })          
    .on("mouseout", function(d) {   
        div.transition()    
        .duration(250)    
        .style("opacity", 0); 
    })
    .merge(node);
  simulation.nodes(nodes);
  sim(1, undefined);
});

//handling simulation ticks
function ticked() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

//slider for setting similarity threshold
var slider = document.getElementById("threshold");
var output = document.getElementById("th");

slider.oninput = function() {
    output.innerHTML = " Threshold: "+ (Number(this.value)/100).toString();
}

slider.onchange = function(){
    sim(Number(this.value)/100);
}

//autocomplete
$('#searchbar').autocomplete({
    lookup: names,
    onSelect: function (suggestion) {
      selected = suggestion.value;
      sim(Number(slider.value)/100);
    }
});
