function User (id, name, pass, score) {
        this.id = id;
        this.username = name;
        this.password = pass;
        this.score = score;
}
function Session (id, date) {
        this.id = id;	
        this.startDate = date;     	
}	

module.exports = {	
        User,	
        Session	
    }
