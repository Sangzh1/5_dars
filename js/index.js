
let  myApp = angular.module("myApp", []);
myApp.service("ContactService" , function(){
	let  uid = 1;
	let  contacts = [{
		  'id' : 0,
				 'name' : 'Steve John',
				 'email' : 'john@gmail.com',
				 'password': 'John123',
				 'phone' : '911-91-199-999'}];	
	
	// Save servise
	this.save = function(contact)  
	{
		if(contact.id == null)                       
		{
			contact.id = uid++;
			contacts.push(contact);
		}
		else
		{
			for(let  i in contacts)
			{
				if(contacts[i].id == contact.id)
				{
					contacts[i] = contact;
				}
			}
		}
	};
	
	// serach for a contact
	
	this.get = function(id)
	{
		for(let  i in contacts )
		{
			if( contacts[i].id == id)
			{
				return contacts[i];
			}
		}
	};
	
	//Delete a contact
	this.delete = function(id)
	{
		for(let  i in contacts)
			{
				if(contacts[i].id == id)
				{
					contacts.splice(i,1);
				}
			}
	};	
	//Show all contacts
	this.list = function()
	{
		return contacts;
	}	;	
});

////Controller area .....
	
myApp.controller("ContactController" , function($scope , ContactService){
    console.clear();
    
    $scope.ifSearchUser = false;
    $scope.title ="List of Users";
    
		$scope.contacts = ContactService.list();
		
		$scope.saveContact = function()
		{
		  console.log($scope.newcontact);
		  if($scope.newcontact == null || $scope.newcontact == angular.undefined)
		  return;
			ContactService.save($scope.newcontact);
			$scope.newcontact = {};
		};		
		$scope.delete = function(id)
		{
			ContactService.delete(id);
			if($scope.newcontact != angular.undefined && $scope.newcontact.id == id)
				{
					$scope.newcontact = {};
				}
		};		
		$scope.edit = function(id)
		{
			$scope.newcontact = angular.copy(ContactService.get(id));
		};		
		$scope.searchUser = function(){
		  if($scope.title == "List of Users"){
		    $scope.ifSearchUser=true;
		    $scope.title = "Back";
		  }
		  else
		  {
		    $scope.ifSearchUser = false;
		    $scope.title = "List of Users";
		  }		  
		};
});