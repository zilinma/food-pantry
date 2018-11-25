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

## **_Functionalities Finished_**

### Tasks Completed

### Demos

## **_Development & Challenges_**

### What did we enjoy?

### What should we do differently?
* Document the code along the way.
* Better time management.

### What's more?
* More user studies of the targeted users.
* A website version of the app for access in the public.

## **_Acknowledgements_**
Thank you person, person and person for ....

## **_How to run the app from these files_**
* Initial requirements
	* NPM - Node Package Manager
	* Expo - installations: `npm install -g expo-cli`
	* Expo (Expo Project) - Installed on your mobile device.
* Packages installation
    * move to the project directory `cd food-pantry`
    * `npm install --save` After this, npm should report that your project packages are correctly installed.
* Compile JavaScript Bundles on your phone or on the emulator.
    * `expo start` After running this, you should see your browser opening the XDE for you. Follow the instruction and open the Expo app:
        * on your phone. Click on the project that you are working on. After the progress bar reaching 100%, you should see the app running on your phone locally.
        * on emulator. In emulator, the app should be shown automatically when you click on "open in emulator" in the XDE. 
    * Then enjoy the food.


