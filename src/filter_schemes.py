# filter_schemes.py
import pandas as pd
import sys
import json

def filter_schemes(age, gender, employment, annual_income, community, first_graduate):
    # Read the dataset from a local CSV file
    dataset_path = 'C:\Users\SAKTHIPRIYA\Desktop\SCHEME SEARCH HUB\Scheme_data.csv'  # Replace with the actual path to your CSV file
    schemes_data = pd.read_csv(dataset_path)

    # Your filtering logic here, replace it with your actual code
    # Example: Filtering based on age, gender, employment, annual income, community, and first graduate
    filtered_schemes = schemes_data[
        (schemes_data['AgeLimit'].apply(lambda x: int(x.split('-')[0])) <= int(age)) &
        (schemes_data['AgeLimit'].apply(lambda x: int(x.split('-')[1])) >= int(age)) &
        (schemes_data['Gender'] == gender) &
        (schemes_data['Employment'] == employment) &
        (schemes_data['AnnualIncome'] == annual_income) &
        (schemes_data['Community'] == community) &
        (schemes_data['FirstGraduate'] == first_graduate)
    ]

    # Convert the result to JSON
    result = filtered_schemes.to_json(orient='records')

    return result

if __name__ == "__main__":
    age = sys.argv[1]
    gender = sys.argv[2]
    employment = sys.argv[3]
    annual_income = sys.argv[4]
    community = sys.argv[5]
    first_graduate = sys.argv[6]

    result = filter_schemes(age, gender, employment, annual_income, community, first_graduate)
    print(result)
