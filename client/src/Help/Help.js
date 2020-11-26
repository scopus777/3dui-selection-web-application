import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Dropdown, Nav, Sidenav} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

/*
* This Component is shown when the user goes to the help page under /help
* */
class Help extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "S3DIT",
            openKeys: ["1"],
            activeKey: "1"
        };
    }

    onClick(targetPage, eventKey, activeKey){
        this.setState({
            currentPage: targetPage,
            openKeys: [eventKey],
            activeKey: activeKey
        })
    }


    render() {
        let view = "";
        if (this.state.currentPage === "S3DIT")
            view =
                <div>
                    <h2>General</h2>
                    <p>Welcome to S3DIT! S3DIT stands for Selection of 3D Interaction Techniques. This tool was developed as part of a doctoral thesis. The goal of the thesis was to support developers of VR applications in finding suitable 3D interaction techniques. A 3D interaction technique maps spatial input recognized by an input device on actions in the virtual world. Over time several interaction techniques were found through literature review and by trying out different VR applications. This tool allows the exploration of the resulting set of over 100 interaction techniques. The techniques can either be filtered according to the dimensions of a taxonomy or suggested based on the data of a user study. This allows matching the techniques with the demands of the target VR system and the application scenario. However, the presented techniques should not be taken as complete and implemented as they are. Instead, the techniques should be considered as an impulse on how to solve specific issues arising in the interaction in VR. Subcomponents of the techniques may be suitable for the application and should be carefully integrated with existing interaction forms of the application. On this page, you can get help on the functionality of the tool as well as an in-depth explanation of the taxonomy and the user study.</p>

                    <h2>Filter</h2>
                    <p>The filter allows you to search for techniques by name or with the help of the dimensions of a taxonomy (see Taxonomy for further help). A click in the search bar opens a context menu where you can choose a criterion for filtering. The criteria correspond to the dimensions of the taxonomy. For example, you can filter for techniques that work on an infinite reach. However, all dimensions of the taxonomy are only available, if the expert mode is activated. This is possible by pressing the switch next to the search bar. The expert mode is only recommended for users who are familiar with all of the dimensions of the taxonomy. If the export mode is deactivated only the most basic criteria are available. It is possible to use multiple criteria. Some criteria can also be used multiple times. Under the search bar, all techniques are listed, which satisfy the criteria. You can find detailed information on the techniques if you click on “Details” (see Detail View for further help). The buttons next to the expert button allow switching between the card mode and the table mode. The table mode allows comparing the techniques according to the dimensions of the taxonomy. This mode is only suggested for experts as a lot of information is displayed at once.</p>

                    <h2>Sort</h2>
                    <p>The page Sort ranks techniques evaluated in a study (see Study for further details) according to different criteria representing an application scenario. To get rankings for a scenario, you need to execute two steps of a wizard. In the first step, you can choose the target task, which can either be selection or manipulation. Furthermore, you can decide whether you want to rank the techniques according to objective or subjective measurements. If you choose the first option, you can define a scenario in the second step. For selection tasks, it is possible to select the distance, object size, and density and for manipulation, the subtask, distance, and manipulation amount. Furthermore, you can prioritize speed or precision. If you chose the subjective option, you can decide whether you want to rank the techniques concerning the usability, naturalness, fun, precision, speed, motion sickness, workload, mental demands, physical demands, performance, effort, or frustration. After a click on “Show Results”, all techniques evaluated in the corresponding study are listed and ranked according to their performance in the defined scenario. At the bottom of the technique cards, the values responsible for the sorting are visible. For some, a higher value is better (e.g. usability) and for some, lower values are is better (e.g. workload).</p>

                    <h2>Detail View</h2>
                    <p>The detail view is reachable by clicking on the “Details” button of the corresponding interaction technique in the filter or sort view. The detail view contains images and a detailed explanation of the technique. Furthermore, the technique is classified according to the dimensions of the taxonomy (see Taxonomy for further details). If the technique was evaluated in the user study, you can find additional information on the implementation of the technique and the results in the user study (see User Study for further details). At the end of the page, you can find further resources for the technique and the sources of the images.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_General")
            view =
                <div>
                    <h2>General</h2>
                    <p>The taxonomy was created to be able to classify interaction techniques according to relevant properties. A taxonomy for interaction techniques can guide the derivation of interaction requirements of the application. Furthermore, a taxonomy can help to group techniques that share similar approaches to support users with the difficulties in VR interaction. The dimensions of the taxonomy can give a first hint on whether techniques tackle a problem or not. Existing classifications and taxonomies were considered in the creation process of the taxonomy. In the detail view, every technique is classified according to this taxonomy. Furthermore, the dimensions of the taxonomy can be used as criteria in the filter view. However, some criteria correspond to sub-dimensions of the taxonomy, which are explained in the corresponding main dimension.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Metaphor")
            view =
                <div>
                    <h2>Metaphor</h2>
                    <p>Interaction techniques are distinguishable by the real-world metaphor they use as a foundation. The metaphor can either be grasping, pointing, and hybrid. Grasping incorporates all techniques that share the metaphor of picking up an object by hand.</p>
                    <p>The subclasses of grasping are hand-based and finger-based techniques. The well-known Simple Virtual Hand technique is a representative of the hand-based class. A virtual proxy imitates the movements of the real hand. Usually, a button press grabs an object if the virtual hand touches it and enables the rotation and translation of the object.</p>
                    <p>Finger-based techniques additionally utilize the finger of the user. For example, the finger-based Virtual Hand works like the Simple Virtual Hand technique but relies on finger tracking.</p>
                    <p>The pointing metaphor has the subclasses vector-based and volume-based. Ray-Casting is a vector-based technique that is often used for selection but rarely for manipulation. A ray originating from the hand enables the user to interact with objects even on greater distances. Volume-based techniques like Flashlight use a selection volume. Here, a cone is used originating from the hand. Since multiple objects can fall into such selection volumes, a disambiguation mechanism is needed to ensure the selection of only one object (see “Disambiguation”).</p>
                    <p>Hybrid techniques incorporate components of both grasping and pointing techniques. For example, the HOMER technique uses a ray for the selection and a form of the virtual hand technique for manipulation to combine the strengths of both.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Executable_Tasks")
            view =
                <div>
                    <h2>Executable Tasks</h2>
                    <p>There is an infinite number of actions someone can do in virtual reality, like turning a crank or throwing an object. It is not possible to analyze interaction techniques regarding every possible task, and we need to focus on the most common ones. The most basic task are selection, positioning, rotation, and scaling.</p>
                    <p>Some techniques can execute only one task like Flashlight, which can only select objects. The Spindle technique, on the other hand, is capable of all four task types. The center between the two hands serves as the selection point. Pressing a button on both controllers simultaneously grabs the object. Moving the hands in the same direction positions the object, rotating the hands around each other rotates the objects, and moving the hands apart or together scales the object.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Two_Handedness")
            view =
                <div>
                    <h2>Two-Handedness</h2>
                    <p>Most of the analyzed techniques only use one hand for the interaction. Adding the possibility to use both hands can increase the performance because the user can use his everyday experience on bimanual interaction. Bimanual interaction can either be symmetric-synchronous, symmetric-asynchronous, asymmetric-synchronous, or asymmetric-asynchronous. In symmetric techniques, both hands do the same, whereas, in asymmetric techniques, both hands do different things. Synchronous and asynchronous refers to the simultaneousness of the actions of both hands. For example, Spindle is a symmetric-synchronous technique as both hands synchronously do the same. Spindle + Wheel extends Spindle by adding the possibility to manipulate the pitch of the object by only rotating the primary hand. This change makes the technique asymmetric-synchronous. The Asymmetric Bimanual Gestural Interface is a technique that is asymmetric-asynchronous. The left hand determines the manipulation type (rotation, translation, or scaling), and the right hand executes the manipulation. For the best of our knowledge, there is no symmetric-asynchronous selection or manipulation technique. It should be mentioned that a few interaction techniques do not need the hands at all like the head-based selection, which uses the view direction of the head. </p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Visual_Feedback")
            view =
                <div>
                    <h2>Visual Feedback</h2>
                    <p>Feedback is an essential tool in human-computer interaction to inform the user about the current state of the interaction and the actions the user has to do to finish the task successfully. In this taxonomy, only visual feedback is considered because other types like haptic and auditive feedback are rarely considered so far in the design of 3D interaction techniques. Based on the analyzed interaction techniques, the following classes are defined: 3D cursor, target highlighting, adopting cursor, additional cursor, widgets, and proxy objects. A technique can use multiple kinds of visual feedback.</p>
                    <p>A 3D cursor is used by almost every interaction technique in the form of a virtual hand (or controller), a point cursor, a virtual ray, or a selection volume. For instance, Head-based selection uses a point cursor indicating the gaze direction. Target highlighting can, for example, be done by changing the color or by using a shadow object.</p>
                    <p>In selection tasks, target highlighting normally indicates the object that will be selected if the user triggers the selection, and in manipulation tasks, it can highlight the predicted target rotation or position. For example, the Knob technique uses a shadow object in the form of a schematic representation to indicate the predicted target location before releasing an object.</p>
                    <p>Cursors can adapt during interaction by, for instance, changing the size, color, or form or by bending to the target. For example, the 3D Bubble Cursor technique uses a sphere as a selection volume. The sphere continuously resizes to ensure that it only touches one object at a time.</p>
                    <p>Some techniques use additional cursor like a second ray or a second hand. The IntenSelect technique generates a second ray that snaps to the object the user probably wants to select based on heuristic calculations.</p>
                    <p>(3D) widgets often provide supportive information or are used in the form of interactive menus. For example, Stretch Go-Go is an extension of the Go-Go technique and divides the space around the user into three areas. If the user places her hand in the outer area, the hand continuously stretches. In the middle area, the technique uses a direct mapping, and in the closest area, the hand continuously retracts back to the user. A gauge widget always indicates in which area the user has placed her hand.</p>
                    <p>Proxy objects are normally miniature models of the real virtual objects with which the user interacts instead of the real objects. For instance, the World In Miniature technique offers a miniature model of the real world in which the user can interact with the objects. The changes to the proxy objects are mapped to the actual objects.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Reach")
            view =
                <div>
                    <h2>Reach</h2>
                    <p>Reach is a category that can help developers to identify whether a technique is specialized on a distance, or it supports multiple distances. Reach is divided into arm-length, scaled, and infinite. Grasping-based techniques with isomorph mapping like the Simple Virtual Hand only allow interaction in the natural working space. Techniques with a scaled reach allow the interaction with objects up to some meters away from the user. For example, the Go-Go technique extends the virtual arm when the user reaches a specified distance away from his body. Pointing techniques like Ray-Casting theoretically have an infinite reach.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Constraints")
            view =
                <div>
                    <h2>Constraints</h2>
                    <p>Constraints restrict the action space to simplify the interaction and to allow a higher precision. They can be classified as degrees of freedom (DoF) reduction, snap to position, or snap to object.</p>
                    <p>DoF reduction ensures that in manipulation tasks, the position or rotation of an object only changes on one or two axes. For example, the Knob technique allows only rotations around one axis, which derives from the hand movements.</p>
                    <p>Knob also incorporates a snap to position constraint, which drags the object to a specific position. Here, the technique repositions the object to a slightly earlier position after release.</p>
                    <p>Snap to object constraints are often used in selection techniques to connect the selection tool to a target object. For Instance, IntenSelect is a pointing technique that uses an invisible cone and calculates scores for the objects according to the distance to the center of the cone and the retention time in the cone. A second bendable ray then snaps to the object with the highest score.</p>
                </div>
        else if (this.state.currentPage === "Taxonomy_Input_Device")
            view =
                <div>
                    <h2>Input Device</h2>
                    <p>VR systems have different capabilities like the number of available buttons on the controller or the tracked degrees of freedom. It is important to know the requirements of the interaction techniques to ensure that the VR system supports the technique. The input device requirements are divided into tracked body parts, Degrees of Freedom (DoFs) and 1D Input.</p>
                    <p>The tracked body parts can be hand (one or two), forearm, upper arm, fingers, head, or eyes. Most of the interaction techniques only rely on one or two hands. The Push technique is one of the few techniques that use the forearm and the upper arm to detect whether the arm is stretched out. This gesture triggers the selection, and therefore the technique does not need additional buttons.</p>
                    <p>The category DoFs states whether the position of a body part needs to be tracked (on the x-, y- and/or z-axis) and/or the roll, pitch and/or yaw of a body part needs to be detected. There are minimum DoFs needed to be able to use a technique and the maximum DoFs supported by the technique. If an input device supports all maximum DoFs, the technique can be potentially more powerful. For example, it is possible to use the Ray-Casting technique by a controller, which only supports rotational tracking like the Controller of the Oculus Go. With the rotation of the hand, the user can comfortably change the direction of the ray. However, positional tracking additionally allows changing the origin of the ray, which gives the user better control over the ray.</p>
                    <p>The 1D Input class defines whether and how many buttons or scroll wheels are needed. A scroll wheel and a touchpad are considered the same as the considered techniques only use up- or downward movements on touchpads.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Transformation_Separation")
            view =
                <div>
                    <h2>Transformation Separation</h2>
                    <p>Most of the available interaction techniques allow multiple transformations simultaneously. For example, translation and rotation are often supported without switching between these two manipulation types. However, users frequently rotate and translate objects separately, and for some tasks, separated manipulation is more suitable. The category transformation separation describes whether tasks can be executed separately and on which axes the manipulation is separated. For example, the Simple Virtual Hand technique has no transformation separation as it simultaneously allows the translation and rotation of an object. In contrast, the Asymmetric Bimanual Gestural Interface has three modes allowing translation and rotation simultaneously, only rotation or only scaling, and therefore it uses a partial transformation separation. In the Crank Handle technique, the user can translate an object after she closes his hand. Opening and closing the hand again switches to the rotation mode, where rotations on the three primarily axes are possible by moving the hand around the particular axis. Therefore, Crank Handle has a full transformation separation.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Mapping")
            view =
                <div>
                    <h2>Mapping</h2>
                    <p>One of the main tasks of an interaction technique is the mapping of the real movements tracked by the input device on movements in the virtual world. The mappings for selection, positioning, rotation, and scaling are considered separately. For selection, the mapping applies to the selection tool. For selection, positioning, and rotation, the transfer functions can be either isomorph, scaled, or remapped. A technique may support multiple mapping types for a single task. The mapping type for a scaling task can either be distance or remapped.</p>
                    <p> An isomorph interaction technique maps the real movements 1-to-1 on a virtual representation like the Virtual Hand technique.</p>
                    <p> The scaled mapping can be further divided into target-oriented, velocity-oriented, manual switching, and area-oriented approach to cover techniques that use a predefined area around the user to adapt the mapping. For example, the Go-Go technique uses an isomorph mapping near the user, but beyond this area, the reach extends non-linearly.</p>
                    <p> Target-oriented techniques adapt the mapping according to the distance to the target, which simulates stickiness. For instance, Follow-Me divides the space around an object into three parts where the area closest to the objects drags the cursor towards the object.</p>
                    <p> A velocity-oriented mapping further reduces the movements on slow velocity for higher precision or increases the movements on higher velocity to, for example, reduce clutching. Scaled HOMER  adds such a velocity-oriented translation mapping to the HOMER technique. The velocity is divided by a scaling constant (SC) to obtain a scaling factor so that the factor is 1.0 when the velocity equals SC. This factor is multiplied with the actual velocity to get the scaled velocity. The scaling factor can go above 1:1, so the technique allows both reduction and amplification of the control-display ratio. Manual switching gives the user control of the control-display ratio. For instance, in the ARM technique, the user can press a button to switch between a normal and a precision mode.</p>
                    <p>In the area-oriented approach, a predefined area around the user is used to adapt the mapping. For example, the Go-Go technique uses an isomorph mapping near the user, but beyond this area, the reach extends non-linearly.  The execution of a task can also completely remapped by using a different transformation (e.g., using translation for rotation in the Crank Handle technique ) or buttons. In Stretch Go-Go, two buttons manipulate the reach of the hand.</p>
                    <p> Scaling techniques often use the distance between the hands to manipulate the size of an object.</p>
                    <p>Some techniques incorporate multiple mappings. For example, Go-Go + PRISM uses the velocity-based mapping of the Go-Go technique to increase the range and adds the velocity-oriented mapping of PRISM to allow higher precision even on greater distances.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Interaction_Termination")
            view =
                <div>
                    <h2>Interaction Termination</h2>
                    <p>The selection and release indication can either be on button press, on button release, dwell or gesture. Most of the techniques select an object the moment a button is pressed. The release of objects is often done on the release of the button as the user holds done the button during manipulation. If dwell time is used, the user needs to place the cursor in a specific area for the specified amount of time. Finger-based techniques normally use gestures to select or release objects like the closing/opening hand gesture. </p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Disambiguation")
            view =
                <div>
                    <h2>Disambiguation</h2>
                    <p>Many interaction techniques use selection volumes, which improve the selection of small objects but comes along with potentially multiple selectable objects. To ensure that only one object is selected, disambiguation is needed. This involves the two components progressive refinement and disambiguation mechanism.</p>
                    <p>Progressive refinement describes the process of reducing a set of potentially selectable objects until only the target object is left and consists of two phases. The first phase defines the group of possible objects, and in the second phase, the number of objects is reduced in different ways. The progressive refinement strategy can be either continuous or discrete. For example, Intend Driven Selection uses a scalable sphere to continuously reduce the number of objects until the target object is selected. The discrete refinement can be either done in a single step or with multiple steps. For instance, the Flashlight technique selects the object which is closest to the center of the cone when the user presses the selection button and therefore uses a single step strategy. On the other hand, the Expand technique uses a cone allowing the user to select multiple objects in the first phase. In the second phase, these objects are arranged as a grid in front of the user enabling the selection of the desired object.</p>
                    <p>The disambiguation mechanism describes how the technique detects the target object and can be manual, heuristic, or behavioral. For example, during the second phase of the Expand technique, the user manually chooses the target object. The heuristic approach ranks the objects according to heuristic calculations and selects the objects with the highest rank. For instance, Flashlight uses the distance of the objects to the center of the ray to determine the ranks. The behavioral approach takes into account the actions of the user before the selection. For Example, the IntenSelect technique uses the distance of the object to the center of the imaginary cone and additionally considers the time the object lies in the cone to predict the target object.</p>
                </div>;
        else if (this.state.currentPage === "Taxonomy_Interaction_Fidelity")
            view =
                <div>
                    <h2>Interaction Fidelity</h2>
                    <p>The interaction fidelity describes how natural an interaction technique feels. The interaction fidelity is divided into biomechanical symmetry, and control symmetry. Biomechanical symmetry can be further divided into kinematic, kinetic, and anthropometry symmetry. Kinematic symmetry describes which parts of the body are moved when using the interaction techniques without considering the forces that cause the movement. This, in turn, is done by the kinetic symmetry. Anthropometry symmetry, on the other hand, describes the exactness of the movements which are done to use the interaction technique in comparison to the real-world task.</p>
                    <p>Control symmetry can be distinguished in dimensional symmetry, transfer function symmetry, and termination symmetry. Dimensional symmetry estimates the degree of exactness with which control dimensions in the compared real-world task are provided through the interaction technique. The transfer function is related to the control display ratio and describes whether the positional and orientational mapping is the same as in the compared task. The termination symmetry specifies whether the interaction is stopped in a similar way by the interaction technique than it is done in the real-world task.</p>
                    <p>An interaction technique with a high interaction technique is the finger-based Virtual Hand. The mapping of the finger and hand movements are isomorph and it corresponds to a real-world task. Less natural is the technique Bimanual Fishing Reel + Scale. After selecting an object with a ray it is attached to the ray which allows controlling the position of the object. Four buttons allow changing the distance and the size of the object. Additionally, while a button on the second controller is pressed its rotation is transferred to the rotation of the object. There is no completely unnatural technique among the analyzed techniques as we only consider techniques based on three-dimensional movements which inherently have a higher naturalness.</p>
                </div>;
        else if (this.state.currentPage === "User_Study_General")
            view =
                <div>
                    <h2>General</h2>
                    <p>The rankings of the techniques on the page “Sort” use the data of a user study where a wide range of interaction techniques was evaluated. Overall twelve interaction techniques were compared in the study. We selected the techniques so that most of the dimension values of the taxonomy are covered. Not all techniques are capable of both selection and manipulation. Therefore, we tested eight techniques in the manipulation sub-study and ten in the selection sub-study. The twelve tested interaction techniques were Bimanual Fishing Reel, Expand, Flashlight, Go-Go + PRISM, Head Based Selection, IntenSelect, Scaled HOMER, Scaled HOMER + Scale, Simple Virtual Hand, Spindle, Scaled Scrolling World in Miniature + Scale, and Crank Handle (Controller). The Hardware Setup consisted of an HTC Vive Pro with the corresponding controller and an Alienware 17 R4 (Intel i7-7700HQ, NVIDIA GTX 1070, 16 GB Ram). Unity was used to implement the test environment.</p>
                </div>;
        else if (this.state.currentPage === "User_Study_Selection")
            view =
                <div>
                    <h2>Selection Sub-Study</h2>
                    <p>As Crank Handle (Controller) does not support selection and Scaled HOMER + Scale behaves the same as Scaled HOMER, these two techniques where not considered in the selection sub-study. The independent variables were the technique, distance (0.6, 3 or 6 m), size (15, 10, and 5 cm) and density (single object, 10 or 5 cm between objects). We measured the time and missed selections. Furthermore, the participants answered two standardized questionnaires on usability (System Usability Scale) and workload (NASA Task Load Index). Additionally, we asked five custom questions regarding naturalness, fun, precision, speed, and motion sickness.</p>
                    <img src="/images/selection_study.png" alt="Selection Study" className="center"/>
                    <p>Before the experiments, each of the participants filled out a questionnaire asking for some personal information like gender, age, primary hand, and experience with relevant technologies and applications. Then a document was handed out explaining the procedure and the following tasks. The selection task consists of two phases. A red sphere had to be selected first to start the time measurement and to spawn an arrangement of one or multiple spheres where the target sphere was colored green. Objects hit by the selection tool of an interaction technique were highlighted by a yellow outline to increase the comparability of the techniques. If the density was 5 or 10 cm, we ensured that there are at least four spheres with the given distance between the target sphere and each sphere. The tasks were generated randomly once, and each participant executed the same tasks in random order. However, because two of the techniques do not support greater distances, we ensured that all tasks with a short distance came first. This ensures that the techniques are comparable on short distance and minders the effect of training. Furthermore, we generated additional dummy tasks for the two techniques to ensure that the same number of tasks were executed with each technique. For each possible variable combination, three tasks were generated. Accordingly, a participant executed 81 tasks with a technique. Each participant evaluated five of the ten interaction techniques. For each technique, the participant got a short explanation and had 5 minutes of training time. The time limit per task was 30 seconds. After finishing all the tasks with a single technique, the participant had to fill out the questionnaires. This procedure was repeated until all five techniques were evaluated.</p>
                    <p>Twenty participants (10 females, one left-handed, age between 18 and 42) took part in this experiment. The participants were asked how many hours per month they used certain devices and applications on average in the last three years. The following picture shows the result:</p>
                    <img src="/images/distribution_participants_selection.png" alt="Distribution Participants Selection" className="center" style={{width: "100%"}}/>
                </div>;
        else if (this.state.currentPage === "User_Study_Manipulation")
            view =
                <div>
                    <h2>Manipulation Sub-Study</h2>
                    <p>As Expand, Flashlight, Head Based Selection, and IntenSelect do not support manipulation, they were not evaluated in the manipulation sub-study. The independent variables were the task type (positioning, rotation, scaling, positioning + rotation or positioning + rotation + scaling), distance (0.6, 3 or 6 m), and manipulation amount (low, medium or high). The different manipulation amounts have two effects. First of all, for positioning and rotation tasks, they determine whether the task has to be executed on one (x), two (x and y), or three axes. Furthermore, the manipulation amount determines how much an object has to be translated, rotated, or scaled. For a low manipulation amount, the object has to be moved 20 cm, rotated between 45 and 90 degrees, and scaled between 1.25 and 1.5 times the starting size (20 cm³). For a medium manipulation amount, the object has to be moved 1 m, rotated between 90 and 135 degrees, and scaled between 1.5 and 1.75 times the starting size. Finally, for a high manipulation amount, the object has to be moved 2 m, rotated between 135 and 180 degrees, and scaled between 1.75 and 2 times the starting size. We measured the time and the accomplished precision for all three task types (position, rotation, and scale). Furthermore, the participants answered two standardized questionnaires on usability (System Usability Scale) and workload (NASA Task Load Index). Additionally, we asked five custom questions regarding naturalness, fun, precision, speed, and motion sickness.</p>
                    <img src="/images/manipulation_study.png" alt="Manipulation Study" className="center"/>
                    <p> Before the experiments, each of the participants filled out a questionnaire asking for some personal information like gender, age, primary hand, and experience with relevant technologies and applications. Then a document was handed out explaining the procedure and the following tasks. The manipulation task required the participant to move, rotate and/or scale an object (start object), so it overlaps as close as possible with a semi-transparent version of the object (target object). The object was a cube where each side had a different color. On two sides, bars in the corresponding color were placed for visual support. Furthermore, small cones are placed directly under the objects. On greater distance, it is hard to see whether die positions of the objects match. The cones work like a shadow, and overlap completely of the positions of the objects are the same. If the object was hit by the selection tool of an interaction technique, it was highlighted by a yellow outline. It was not possible to manipulate the target object. To confirm a solution, the participant had to press the side buttons (grip buttons) of the primary controller. The solution was only accepted if the tolerance values were not exceeded (position: 10 cm, rotation: 20 degrees, scale: 10 cm). The tasks were generated randomly once, and each participant executed the same tasks in random order. However, because some of the techniques do not support greater distances and/or scaling tasks, we ensured that all tasks with a short distance came first, followed by the scaling tasks. This ensures that the techniques are comparable on short distance and without scaling and minders the effect of training. Furthermore, we generated additional dummy tasks if necessary, to ensure that the same number of tasks were executed with each technique. For each possible variable combination, two tasks were generated. Accordingly, a participant executed 90 tasks with a technique. Each participant evaluated three of the eight interaction techniques. For each technique, the participant got a short explanation and had 5 minutes of training time. The time limit per task was 30 seconds. After finishing all the tasks with a single technique, the participant had to fill out the questionnaires. This procedure was repeated until all five techniques were evaluated.</p>
                    <p> Thirty-two participants (twelve females, two left-handed, age between 18 and 40) took part in this experiment. The participants were asked how many hours per month they used certain devices and applications on average in the last three years. The following picture shows the result:</p>
                    <img src="/images/distribution_participants_manipulation.png" alt="Distribution Participants Manipulation" className="center" style={{width: "100%"}}/>
                </div>;
        else if (this.state.currentPage === "User_Study_Questionnaires")
            view =
                <div>
                    <h2>Questionnaires</h2>
                    <p>We used two standard questionnaires on usability (System Usability Scale) and workload (NASA Task Load Index). Furthermore, we asked five custom questions regarding naturalness, fun, precision, speed, and motion sickness. We removed the question asking for the temporal affordance from the NASA questionnaire for the analysis of the results because we noticed that most of the participants did not understand the question correctly or referred to the temporal affordance of the task and not the technique. This does not affect the expressiveness of the NASA questionnaire but can limit the comparability with other studies where the questionnaire was used. The questions were asked in german. In the following, the translated questions are listed.</p>

                    <h3>System Usability Scale</h3>
                    <p>I think that I would like to use this interaction technique frequently.</p>
                    <p>I found the interaction technique unnecessarily complex.</p>
                    <p>I thought the interaction technique was easy to use.</p>
                    <p>I think that I would need the support of a technical person to be able to use this interaction technique.</p>
                    <p>I found the various functions in this interaction technique were well integrated.</p>
                    <p>I thought there was too much inconsistency in this interaction technique.</p>
                    <p>I would imagine that most people would learn to use this interaction technique very quickly.</p>
                    <p>I found the interaction technique very cumbersome to use.</p>
                    <p>I felt very confident using the interaction technique.</p>
                    <p>I needed to learn a lot of things before I could get going with this interaction technique.</p>

                    <h3>NASA Task Load Index</h3>
                    <p>Mental Demand: How much mental and perceptual activity was required? Was the task easy or demanding, simple or complex?</p>
                    <p>Physical Demand: How much physical activity was required? Was the task easy or demanding, slack or strenuous?</p>
                    <p>Overall Performance: How successful were you in performing the task? How satisfied were you with your performance?</p>
                    <p>Effort: How hard did you have to work (mentally and physically) to accomplish your level of performance?</p>
                    <p>Frustration Level: How irritated, stressed, and annoyed versus content, relaxed, and complacent did you feel during the task?</p>

                    <h3>Custom Questions</h3>
                    <p>Naturalism: To what extent did the interaction technique correspond to action sequences that you know from the real world?</p>
                    <p>Fun: How much fun did you have while interacting with the interaction technology?</p>
                    <p>Precision: How precisely could you work with interaction technology?</p>
                    <p>Speed: How quickly could you work with interaction technology?</p>
                    <p>Motion Sickness: How much did you feel unwell (nausea, dizziness or headaches) when using the interaction technique?</p>
                </div>;
        else if (this.state.currentPage === "Literature")
            view =
                <div>
                    <h2>Literature</h2>
                    <p>In the following you can find literature about S3DIT and the used taxonomy:</p>
                    <p>
                        Matthias Weise, Raphael Zender and Ulrike Lucke, 2020, „How can I grab that?“. Solving issues of interaction in VR by choosing suitable selection and manipulation techniques. In i-com – Journal of Interactive Media. Special Issue on New Digital Realities, F. Steinicke and K. Wolf, Eds. De Gruyter. <a href="https://doi.org/10.1515/icom-2020-0011">10.1515/icom-2020-0011</a>.
                    </p>
                    <p>
                        Matthias Weise, Raphael Zender and Ulrike Lucke, 2019, A Comprehensive Classification of 3D Selection and Manipulation Techniques. In Mensch und Computer 2019. ACM, New York, NY, USA, 321–332. <a href="https://doi.org/10.1145/3340764.3340777">10.1145/3340764.3340777</a>.
                    </p>
                    <p>
                        Matthias Weise and Raphael Zender, 2019, A Systematic Literature Review on Independent Variables Used in User Studies on 3D Selection and Manipulation Techniques. In 16. Workshop der GI-Fachgruppe VR/AR, P. Grimm, Y. Jung and R. Dörner, Eds. Virtuelle und erweiterte Realität.
                    </p>
                </div>;
        return (
            <div style={{width: "100%", height: "100%" }}>
                <div style={{ width: 250, height: "100%", float: "left" }}>
                    <Sidenav openKeys={this.state.openKeys} activeKey={this.state.activeKey} appearance="subtle" >
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" onClick={() => this.onClick("S3DIT", "1", "1")}>
                                    S3DIT
                                </Nav.Item>
                                <Dropdown eventKey="2" title="Taxonomy" onClick={() => this.onClick("Taxonomy_General", "2", "2-1")}>
                                    <Dropdown.Item eventKey="2-1" onClick={() => this.onClick("Taxonomy_General", "2", "2-1")}>General</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-2" onClick={() => this.onClick("Taxonomy_Metaphor", "2", "2-2")}>Metaphor</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-3" onClick={() => this.onClick("Taxonomy_Executable_Tasks", "2", "2-3")}>Executable Tasks</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-4" onClick={() => this.onClick("Taxonomy_Two_Handedness", "2", "2-4")}>Two-Handedness</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-5" onClick={() => this.onClick("Taxonomy_Visual_Feedback", "2", "2-5")}>Visual Feedback</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-6" onClick={() => this.onClick("Taxonomy_Reach", "2", "2-6")}>Reach</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-7" onClick={() => this.onClick("Taxonomy_Constraints", "2", "2-7")}>Constraints</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-9" onClick={() => this.onClick("Taxonomy_Input_Device", "2", "2-9")}>Input Device</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-10" onClick={() => this.onClick("Taxonomy_Transformation_Separation", "2", "2-10")}>Transformation Separation</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-11" onClick={() => this.onClick("Taxonomy_Mapping", "2", "2-11")}>Mapping</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-12" onClick={() => this.onClick("Taxonomy_Interaction_Termination", "2", "2-12")}>Interaction Termination</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-13" onClick={() => this.onClick("Taxonomy_Disambiguation", "2", "2-13")}>Disambiguation</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-14" onClick={() => this.onClick("Taxonomy_Interaction_Fidelity", "2", "2-14")}>Interaction Fidelity</Dropdown.Item>
                                </Dropdown>
                                <Dropdown eventKey="3" title="User Study" onClick={() => this.onClick("User_Study_General", "3", "3-1")}>
                                    <Dropdown.Item eventKey="3-1" onClick={() => this.onClick("User_Study_General", "3", "3-1")}>General</Dropdown.Item>
                                    <Dropdown.Item eventKey="3-2" onClick={() => this.onClick("User_Study_Selection", "3", "3-2")}>Selection Sub-Study</Dropdown.Item>
                                    <Dropdown.Item eventKey="3-3" onClick={() => this.onClick("User_Study_Manipulation", "3", "3-3")}>Manipulation Sub-Study</Dropdown.Item>
                                    <Dropdown.Item eventKey="3-4" onClick={() => this.onClick("User_Study_Questionnaires", "3", "3-4")}>Questionnaires</Dropdown.Item>
                                </Dropdown>
                                <Nav.Item eventKey="4" onClick={() => this.onClick("Literature", "4", "4")}>
                                    Literature
                                </Nav.Item>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                </div>
                <div className="help-text">
                    {view}
                </div>
            </div>
        );
    }
}

export default withRouter(Help);
