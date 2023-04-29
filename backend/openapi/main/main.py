import openai
import pandas as pd
import openai, os

api_key = os.getenv("OPENAI_KEY", None)

def process_user_prompt(user_prompt):
    # Read the CSV file and store it in a DataFrame
    data = pd.read_csv('insurance_coverage.csv')
    raw_data = data.copy()

    # Call the existing code to process the user_prompt and extract the tables
    extracted_tables = extract_tables_from_data(data, raw_data, user_prompt)

    return extracted_tables

# # Read the CSV file and store it in a DataFrame
# data = pd.read_csv('insurance_coverage.csv')

# # save raw data
# raw_data = data.copy()

# # Get user input
# user_prompt = input("Please enter your query: ")

def extract_tables_from_data(data, raw_data, user_prompt):

    category_str = "['routinephysicalexams', 'preventivecareimmunizations', 'routinegynecologicalexamsincludingpapsmearsandcytologytests', 'preventivescreeningandcounselingservices', 'familyplanningservicesfemalecontraceptives', 'physiciansandotherhealthprofessionals', 'allergytestingandtreatment', 'physicianandspecialistsurgicalservices', 'alternativestophysicianofficevisits', 'hospitalandotherfacilitycare', 'alternativestohospitalstaysurgentcarehospice', 'pediatricdentalcarelimitedtocoveredpersonsthroughtheendofthemonthinwhichthepersonturnsage19', 'othertreatments', 'obesitysurgerytravelandlodging', 'familyplanningservicesother', 'genderaffirmingtreatment', 'mentalhealth&substanceabusetreatment', 'specifictherapiesandtests', 'otherservicesandsupplies', 'hearingexams', 'pediatricvisioncarelimitedtocoveredpersonsthroughtheendofthemonthinwhichthepersonturnsage19', 'adultvisioncarelimitedtocoveredpersonsage19andover', 'outpatientprescriptiondrugs', 'contraceptivesbirthcontrol', 'transplantservices', 'treatmentofinfertility', 'fertilitypreservationservices']"

    cleaned_categories = ['routinephysicalexams', 'preventivecareimmunizations', 'routinegynecologicalexamsincludingpapsmearsandcytologytests', 'preventivescreeningandcounselingservices', 'familyplanningservicesfemalecontraceptives', 'physiciansandotherhealthprofessionals', 'allergytestingandtreatment', 'physicianandspecialistsurgicalservices', 'alternativestophysicianofficevisits', 'hospitalandotherfacilitycare', 'alternativestohospitalstaysurgentcarehospice', 'pediatricdentalcarelimitedtocoveredpersonsthroughtheendofthemonthinwhichthepersonturnsage19', 'othertreatments', 'obesitysurgerytravelandlodging', 'familyplanningservicesother', 'genderaffirmingtreatment', 'mentalhealth&substanceabusetreatment', 'specifictherapiesandtests', 'otherservicesandsupplies', 'hearingexams', 'pediatricvisioncarelimitedtocoveredpersonsthroughtheendofthemonthinwhichthepersonturnsage19', 'adultvisioncarelimitedtocoveredpersonsage19andover', 'outpatientprescriptiondrugs', 'contraceptivesbirthcontrol', 'transplantservices', 'treatmentofinfertility', 'fertilitypreservationservices']

    def call_ai():
        # Create a new prompt for the OpenAI API
        print(user_prompt)
        new_prompt = f"{user_prompt} Choose the top 3 most relevant categories according to the question of the following string array of categories: {category_str}. Do not give me more than three answers. Do not generate any categories. Return them in the same format as the input."
        # Call the OpenAI API

        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=new_prompt,
            max_tokens = 200,
            n=1,
            stop=None,
            temperature=0.7,
        )

        # Save the response (relevant categories)
        response = response.choices[0].text.lstrip().strip()

        # Split response
        response = response.lower().replace(" ", "").split()

        # new response list
        cleaned_response = []

        # clean the response
        for elem in response:
            if "." in elem:
                elem = elem.replace(".", "")
            elem = elem.lstrip()
            elem = elem.strip()
            elem = elem.replace("(", "")
            elem = elem.replace(")", "")
            elem = elem.replace("/", "")

            if elem in cleaned_categories:
                cleaned_response.append(elem)
        
        if len(cleaned_response) == 0:
            return call_ai()
        
        return cleaned_response

    cleaned_response = call_ai()

    # Save the data in description column
    data['Description'] = data['Description'].astype(str)

    # Convert the 'Description' column to lowercase and strip spaces
    data['Description'] = data['Description'].str.lower().str.strip().str.replace(" ", "").str.replace("/", "").str.replace("(", "").str.replace(")","")
    # print(data)

    # cleaned list of categories
    cleaned_categories = ['routinephysicalexams', 'preventivecareimmunizations', 'routinegynecologicalexamsincludingpapsmearsandcytologytests', 'preventivescreeningandcounselingservices', 'familyplanningservicesfemalecontraceptives', 'physiciansandotherhealthprofessionals', 'allergytestingandtreatment', 'physicianandspecialistsurgicalservices', 'alternativestophysicianofficevisits', 'hospitalandotherfacilitycare', 'alternativestohospitalstaysurgentcarehospice', 'pediatricdentalcarelimitedtocoveredpersonsthroughtheendofthemonthinwhichthepersonturnsage19', 'othertreatments', 'obesitysurgerytravelandlodging', 'familyplanningservicesother', 'genderaffirmingtreatment', 'mentalhealth&substanceabusetreatment', 'specifictherapiesandtests', 'otherservicesandsupplies', 'hearingexams', 'pediatricvisioncarelimitedtocoveredpersonsthroughtheendofthemonthinwhichthepersonturnsage19', 'adultvisioncarelimitedtocoveredpersonsage19andover', 'outpatientprescriptiondrugs', 'contraceptivesbirthcontrol', 'transplantservices', 'treatmentofinfertility', 'fertilitypreservationservices']

    # instantiate dictionary and extracted tables list
    new_dict = {}
    extracted_tables = []

    # iterate through response
    for category in cleaned_response:
        # Filter the DataFrame based on the first category in the response
        contains_series = data['Description'].str.contains(category)
        indexes = contains_series.loc[contains_series].index

        first_index = indexes[0]
        new_dict[category] = first_index
        print(data.iloc[first_index])

        index_current = cleaned_categories.index(category)
        index_next = index_current + 1

        next_category = cleaned_categories[index_next]

        contains_next = data['Description'].str.contains(next_category)
        indexes = contains_next.loc[contains_next].index

        last_index = indexes[0]
        new_dict[category] = (first_index, last_index)
        extracted_table = raw_data.iloc[first_index:last_index]
        extracted_tables.append(extracted_table)
        
        
    return extracted_tables

    # for index, table in enumerate(extracted_tables):
    #     table.to_csv(str(index) + ".csv")

# print(new_dict)
