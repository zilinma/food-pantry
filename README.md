## **_Original Problem Statement_**
Food insecurity refers to the lack of reliable access to a sufficient quantity of affordable, nutritious food. It affects millions of people in the US, and is an invisible problem both at Bucknell and in Lewisburg as well. To mitigate this problem, there are a few formal and informal food pantries in Lewisburg. However it is hard for people to know exactly what kind of food the pantries offer, or how they might be able to help these pantries. 

This project aims to tackle this problem, by collaborating with Professor Darakhshan Mir at Bucknell University and Cynthia Peltier, the director of CommUnity Zone in Lewisburg. Our initial proposed solution was to design a mobile app that will allow a user to view all food pantries near their location and offer them option to view current items in them. However, after communication with our clients, we have realized that our project scope was complicated (will be discussed in detail later). As a result, we have rescoped our project to focus primarily on the food pantry at Bucknell. We will still provide information for other pantries in the app, however, it will be limited to basic information about the pantries. For the Bucknell pantry, we will include basic information about the pantry, as well as an inventory of items, and provide the users with two options:

* If the user is an admin, they will be able to edit the information about the pantry in the app, including the inventory of items.
* If the user is a consumer, they will be able to view the basic information and the inventory of the pantry.

## Current Solution (AKA Problem)
* Currently, there is no remote (app/website based) platform available for people to connect the food pantries with their users. As a result, there are a number of issues that the users face. 
* People have to go to the pantry itself in order to get the information about the items available. 
* People have to show up in person and register themselves at a pantry to use the pantry.
* People find hard to know the food pantries available in town. 
* There is no formal process for keeping an inventory of the food items available at the pantries, which makes the work of the administrators hard. 


## **_Design Revisions_**
## Initial Version
<Sketch here>
As seen in the sketches above, listed below are some of the features that the app provides based on the users.
### Features available to all users: ###
* Information about specific pantry
* Contact information
* Address
* Navigation
* Working hours
* Bucknell students working there?
* Can view items
### Features available to Donors
* Notifications for food item shortage 
* Can only view items
### Features available to Admins
* Notifications for food item shortage 
* Can add/withdraw items
* Can see their specific food pantry
### Features available to Consumers
* Can only view items
* Can see all food pantries they’re registered to
* 
**_Version after talking with our clients_**
To make sure our product caters to our users’ needs, we set out to do user research. We have two main users of our product: 

* Food pantry users
    * We have been in contact with Kyle Bray, Assistant Director of Service-Learning at Bucknell, to connect us with students who would be willing to participate in a usability testing session of the app. He was able to successfully connect us with Hannah Buckley, a student who has been involved with food insecurity at the Mt Carmel region, and we have been trying to set up a time to meet. This will happen in the very near future.

    * We also have been in contact with Mona Mohammed, one of the very active students in regards to food insecurity at Bucknell, to connect us with any students who would be willing to participate in a usability testing session of the app. To make the process more streamlined, we created a sign-up Google Form so that anyone who is interested in helping us with usability testing could easily fill it out in less than a minute. The goal was to then contact them to set up a time to meet up with them.

    * Unfortunately, the latter has not been very successful as we got no responses on our Google form. Therefore, what we are thinking of now is to go to a public space, such as the library or 7th street cafe, and ask students if they would be willing to help us test the app. This is not the best user research practice since it will certainly introduce selection bias, but it is our best option for now.

* Food pantry administrators
    * We met with Jennifer Albright, Student Affairs Operations Administrator at Bucknell University, and received useful feedback on the app. Since there are no official administrators for the food pantry, she agreed to be a temporary administrator until the school starts creating a student job for that.

* After speaking with Jennifer Albright, the following are changes that we have brought to the app:
    * We have added options for dietary needs such as gluten-free and vegetarian.
    * We have changed the way an administrator can add an item to be more intuitive.
    * Instead of having the exact quantity of the food items, which would take so much of the administrator’s time, we have decided to put assign an “availability” label to the item which can be high, medium, or low. That way, administrators will not have to spend extended amounts of time counting the food items each time a student comes and picks up an item, and students will still know if the pantry is low on stock on a specific item so they do not waste their time coming all the way to the pantry.
    * Addition of the checkout form to the Bucknell Pantry. The way Bucknell has the check out process in the food pantry now is that they make students use an iPad in the pantry to fill out a form and check out an item. By including the checkout form in the app, the checkout experience will be more dignified and less awkward for students who use the pantry.

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


