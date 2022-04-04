import { ProjectList } from './projectList.js';

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/utility/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
