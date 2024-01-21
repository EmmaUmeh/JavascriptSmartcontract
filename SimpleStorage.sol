// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract SimpleStorage {
 
   // bool hasFavoriteNumber = true;
   // uint favoriteNumber = 23;
   // uint256 favoriteNumberSmall = 5;
   // string favoriteNumberInText = 'Five';
   // int256 favoriteNumberInt = -45;
   // address favoriteNumberAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

   uint256 public favoriteNumber;
   // People public person = People({favoriteNumber: 2, name: "Emmanuel"});
   // People public person2 = People({favoriteNumber: 2, name: "Patrick"});
   // People public person3 = People({favoriteNumber: 2, name: "Ally"});


   mapping(string => uint256) public nameToFavoriteNumber;

   struct People{
      uint256 favoriteNumber;
      string name;
   }

   People[] public people;

   function store(uint256 _favoriteNumber) public {
      favoriteNumber = _favoriteNumber;
      // retrieve();
      // uint256 testVar = 5;
   }

   // view, pure
   function retrieve() public view returns(uint256){
      return favoriteNumber;
   }

   // calldata, memory, storage
   function addPerson(string memory _name, uint256 _favoriteNumber) public{
      people.push(People(_favoriteNumber, _name));
      nameToFavoriteNumber[_name] = favoriteNumber;
   }

}

