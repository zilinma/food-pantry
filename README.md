## **_Overview_**
## Problem
Food insecurity refers to the lack of reliable access to a sufficient quantity of affordable, nutritious food. It affects millions of people in the US, and is an invisible problem both at Bucknell and in Lewisburg as well. To mitigate this problem, there are a few formal and informal food pantries in Lewisburg. However, there are still some problems that prevent the food pantries from being as effective as they could be. Some of them are listed below:
* There is no remote (app/website based) platform available for people to connect the food pantries with their users. 
* People find it difficult to know the food pantries available in town.
* People have to go to the pantry itself in order to get the information about the items available.
* There is no formal process for keeping an inventory of the food items available at the pantries, which makes the work of the administrators hard.

This project aims to tackle these problems by collaborating with Professor Darakhshan Mir at Bucknell University and Cynthia Peltier, the director of CommUnity Zone in Lewisburg. 

## Solution
Our initial proposed solution was to design a mobile app that will allow a user to view all food pantries near their location and offer the option to view current items in them. However, after communication with our clients, we have realized that our project scope was complicated (will be discussed in detail later). As a result, we have rescoped our project to focus primarily on the food pantry at Bucknell. We will still provide information for other pantries, however, it will be limited to basic information about the pantries. For the Bucknell pantry, we will include basic information about the pantry, as well as an inventory of items, and provide the users with two options:

* If the user is an admin, they will be able to edit the information about the pantry in the app, including the inventory of items.
* If the user is a consumer, they will be able to view the basic information and the inventory of the pantry.

## **_Project Descriptions_**
As mentioned above, the app caters to two main groups of users: Administrator and Consumer. Administrators are people who are responsible for running the specific food pantry. Consumers are students and community members who use the food pantry. Depending on the status of the users, they will have access to various features.

### Features available to Consumers:
* Can view basic information about a pantry
** Name
** Contact information
** Address and direction
** Working hours
* Can view the inventory of the items available (for the Bucknell pantry only)

### Features available to Administrators:
* Can edit basic information (listed above) regarding the pantry that they administer.
* Can edit the inventory of the items of the food pantry. 
** Add new items
** Delete items
** Modify availability of items

## **_Demo_**

**TODO: Upload a video of us going through the app or a gif of that**
 
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

### UI Design ###
* Adobe XD
    * Adobe XD is a user experience design software application developed and published by Adobe Systems. It supports vector design and website wireframing, and creating simple interactive click-through prototypes.
    * We used adobe XD to create mid-fidelity and high-fidelity prototypes in order to test the user flow and visual appeal of our app before commiting to coding the app. Adobe XD particularly shine here due to its native prototyping feature where we can generate interactive clickable screens without the need of a third-party app.

## **_Development & Challenges_**

### What did we enjoy?
* The multifaceted nature of the project. We worked with our client, different types of users, and our professor. It was fun getting input from such a diverse set of individuals.
* Doing user research and have our preconceived notions of what works and what does not work be challenged.
* Coming up with creative ways to solve problems
* Iteratively changing our designs to be more slick and streamlined

### What should we do differently?
* Document the code along the way.
* Better time management.

### What's more?
* More user studies of the targeted users.
* A website version of the app for access in the public.

## **_Acknowledgements_**
We would love to thank the following people for their generous contribution to our project:
* Cynthia Peltier for giving us feedback on early versions of our app and connecting us with people who would be interested in the app
* Kyle Bray for connecting us with students and staff members to help us test our app
* Hannah Buckley for helping us do user research
* Bucknell University students for helping us do user research
* Jennifer Albright for her contributions to the food pantry, taking the lead on being the main administrator for the app, and help us do user research
* Professor Darakhshan Mir for mentoring the team on a regular basis and providing positive and constructive feedback
* Professor Evan Peck for guiding us throughout the project and proving us with the necessary tools to succeed

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
