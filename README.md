# nonce-service
Test project for setting up CI/CD with Kubernetes

---

**DevOps Notes**

Making a new service:
- use one of the template repos provided in our org
- replace all of the necessary information:
  - package.json:
    - name
    - version
    - description
  - chart/Chart.yaml:
    - name
    - version
    - appVersion
- create a .env file for dev env variables

TODO: better project name consistency and versioning stuff
TODO: git hooks for (linting, tests, build)
TODO: switch from docker hub to github packages 
