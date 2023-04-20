Feature: Obtain the total number of courses
    In order to have a courses counter
    As a user
    I want to see the courses counter

    Scenario: With one course
        Given I send an event to the event bus:
        """
        {
            "data": {
                "id":"25e9f9cd-36a8-42f9-90cb-f66b947275c3",
                "type": "course.created",
                "occurred_on": "2019-08-08T08:37:32+00:00",
                "aggregateId": "261204e5-1e35-4fe6-af8d-006248aede04",
                "attributes": {
                    "name": "DDD en PHP!",
                    "duration": "25 hours"
                },
                "meta": {
                    "host": "111.26.06.93"
                }
            }
        }
        """
        When I send a GET request to "/courses-counter"
        Then the response status code should be 200
        And the response content should be:
        """
        {
            "total": 1
        }
        """