Feature: Create a new course
    In order to have courses in the platform
    As a user with admin permissions
    I want to create a new courses

    Scenario: A valid non existing course
        Given I send a PUT request to "/courses/9cf6a653-9137-495f-997c-a77e14fb98c5" with body:
        """
        {
            "name": "The best course",
            "duration": "5 hours"
        }
        """
        Then the response status code should be 201
        And the response should be empty