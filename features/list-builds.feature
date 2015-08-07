Feature: List features
  As a user of frigg
  I want to be able to list build results

  Scenario: List builds of all projects
    Given I am on "/"
    Then I should see a list of builds

  Scenario: List builds of an organization
    Given I am on "/frigg/"
    Then I should see a list of builds
    And I should only see "frigg" builds in the list

  Scenario: List builds of a project
    Given I am on "/frigg/frigg-hq/"
    Then I should see a list of builds
    And I should only see "frigg-hq" builds in the list
