
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
const ProjectDetailsScreen = ({ route,navigation }) => {
    const { projectId, projectName } = route.params;

  const [feedback, setFeedback] = useState('');

  const submitFeedback = async () => {
    // try {
    //   const response = await axios.post('https://your-backend-api/submit-feedback', {
    //     projectId: project.projectId,
    //     feedback,
    //   });

    //   Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    // } catch (error) {
    //   console.error('Error submitting feedback:', error);
    //   Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    // }
    navigation.navigate('demo',{inputText:feedback})
  };

  const mockProject = {
    projectId: 1,
    projectName: 'Sample Project',
    totalBudget: '$500,000',
    projectType: 'Development',
    projectDetails: `Linux, an open-source operating system, stands as a testament to collaborative innovation, embodying the ethos of freedom, flexibility, and community-driven development. Since its inception in 1991 by Finnish computer science student Linus Torvalds, Linux has evolved into a robust and versatile platform powering a myriad of devices, from smartphones to supercomputers, embedded systems to enterprise servers, and everything in between. At its core lies the Linux kernel, the fundamental component responsible for managing hardware resources, scheduling tasks, and facilitating communication between software and hardware components. The kernel's modular design and adherence to Unix principles enable it to adapt seamlessly to various hardware architectures and user requirements, fostering a diverse ecosystem of distributions tailored to specific use cases and preferences.

    One of Linux's defining features is its open-source nature, which grants users the freedom to study, modify, and distribute the source code according to their needs and preferences. This transparency not only fosters innovation but also instills a sense of trust and security, as the community can scrutinize the code for vulnerabilities and implement fixes promptly. Furthermore, the open-source model encourages collaboration among developers worldwide, leading to rapid advancements and widespread adoption across industries and disciplines.
    
    Linux's versatility is exemplified by its support for a wide range of programming languages, development tools, and frameworks, empowering developers to create applications and services tailored to diverse environments and requirements. Whether building web applications using Python, deploying machine learning models with TensorFlow, or developing low-level system utilities in C, Linux provides a robust foundation equipped with the necessary tools and libraries to bring ideas to fruition efficiently. Moreover, its compatibility with popular development environments such as GNU Compiler Collection (GCC), Integrated Development Environments (IDEs) like Visual Studio Code, and version control systems like Git simplifies the development workflow and facilitates collaboration among team members.
    
    In addition to its role as a development platform, Linux serves as a powerful server operating system, underpinning the backbone of the internet and supporting critical infrastructure worldwide. Its stability, performance, and scalability make it the preferred choice for hosting websites, databases, cloud services, and enterprise applications, catering to the demanding requirements of modern computing environments. Furthermore, Linux's modular architecture and support for containerization technologies like Docker and Kubernetes enable organizations to build, deploy, and manage complex distributed systems with ease, leveraging resources efficiently and maximizing operational efficiency.
    
    The Linux ecosystem boasts a vast repository of software packages curated by distribution maintainers and community contributors, encompassing everything from essential system utilities to graphical desktop environments, productivity suites, multimedia applications, and games. Package managers such as apt, yum, and pacman streamline the process of installing, updating, and removing software, ensuring system integrity and dependency management. Moreover, the availability of software repositories and package management tools facilitates rapid software deployment and maintenance, empowering users to customize their systems to suit their preferences and requirements effortlessly.
    
    Linux's influence extends beyond traditional computing devices, encompassing a diverse array of embedded systems, IoT devices, and specialized hardware platforms. Its lightweight footprint, scalability, and customizability make it an ideal choice for embedded applications, ranging from consumer electronics and network routers to industrial automation systems and automotive infotainment units. Furthermore, Linux's robust security features, including access controls, firewalls, and cryptographic protocols, make it well-suited for securing sensitive data and protecting against malicious threats in interconnected environments.
    
    In conclusion, Linux represents more than just an operating system; it embodies a philosophy of collaboration, empowerment, and innovation that transcends technological boundaries. Its open-source nature, versatility, and community-driven development model have propelled it to the forefront of modern computing, shaping the digital landscape and empowering individuals and organizations to realize their full potential. As we embark on the next chapter of technological evolution, Linux stands poised to continue its legacy of empowering creativity, driving innovation, and democratizing access to computing resources for generations to come.` ,
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.projectId}>Project ID: {projectId}</Text>
        <Text style={styles.projectName}>{projectName}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Budget:</Text>
          <Text style={styles.detailValue}>{mockProject.totalBudget}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Type of Project:</Text>
          <Text style={styles.detailValue}>{mockProject.projectType}</Text>
        </View>

        <View style={styles.detailItempro}>
          <Text style={styles.detailLabel}>Project Details</Text>
          <Text>{mockProject.projectDetails}</Text>
        </View>
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackLabel}>Feedback:</Text>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Add your feedback here"
          multiline
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
          <Text style={styles.submitButtonText} >Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:45,
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  projectId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItempro:{
    justifyContent: 'space-between',
    marginBottom: 12,
    
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    padding:20,
  },
  detailValue: {
    fontSize: 16,
    padding:20,
  },
  feedbackContainer: {
    marginTop: 20,
  },
  feedbackLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProjectDetailsScreen;
