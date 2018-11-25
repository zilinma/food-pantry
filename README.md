## **_Original Problem Statement_**
Food insecurity is an invisible problem both at Bucknell and in Lewisburg. There are a few formal and informal food pantries in Lewisburg, however it is hard for the local people to know exactly what they offer, or how they might be able to help these pantries. 

This project aims to tackle this problem, by collaborating with Professor Darakhshan Mir at Bucknell University and the people at the local food pantries. Our proposed solution is to design a mobile app that will allow a user to view all food pantries near their location and offer them two options:
* Search for the location of a specific food pantry and for the current items in it.
* Check the inventory of those pantries.

For administrators of these pantries, the app will allow necessary edit functions.

## **_Design Revisions_**
## **_Design_**
### System Design ###
* React Native
    * React Native provides a platform for a scalable code base and it is easy to handle API imports in it. In addition, it allows us to build cross-platform apps, which would make it really convenient in case we want to expand the app to an iOS platform. 

* FireBase 
    * FireBase will provide real time synchronization of our data. With cross-platform support, synchronization between the client and the users will be pretty easy. Moreover, Firebase already has full support for React Native, which will make it easy to integrate FireBase in React Native. 
    * The whole database for FireBase might be small at the beginning, but we anticipate it to be larger as there are more users. FireBase allows us to migrate the data to other platforms easily in the future.
* Google APIs
    * Google Map APIs provide direction and distance calculations.

