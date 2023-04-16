import json
from django.shortcuts import render
import openai, os
from dotenv import load_dotenv


load_dotenv()
api_key = os.getenv("OPENAI_KEY", None)
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.decorators import api_view

from main.main import process_user_prompt

@api_view(["POST"])
def extract_data(request):
    if api_key is not None and request.method == 'POST':
        openai.api_key = api_key
        data = json.loads(request.body)
      
    # Get the user_prompt from the request
    user_prompt = data.get('input')

    # Call the existing code to process the user_prompt and extract the tables
    # (Replace call_ai() and the rest of the code with a function)
    extracted_tables = process_user_prompt(user_prompt)

    # Convert the extracted tables to JSON and return it as a response
    json_tables = [table.to_json(orient="records") for table in extracted_tables]
    return JsonResponse({"tables": json_tables})


def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')


@csrf_exempt
def my_api_endpoint(request):
    if api_key is not None and request.method == 'POST':
        openai.api_key = api_key
        data = json.loads(request.body)
        user_input = data.get('input')
        print (data)
        prompt = user_input
        response = openai.Completion.create(
            engine = 'text-davinci-003',
            prompt = prompt,
            max_tokens = 256,
            temperature = 0.5
        )
        print(prompt)
        print(response)
        # Do something with the input data
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})

def chatbot(request):
     chatbot_response = None; 
     if api_key is not None and request.method == 'POST':
        openai.api_key = api_key
        user_input = request.POST.get('user_input')
        prompt = user_input

        response = openai.Completion.create(
            engine = 'text-davinci-003',
            prompt = prompt,
            max_tokens = 256,
            temperature = 0.5
        )
        print(prompt)
        print(response)


     return render(request, 'main.html', {})