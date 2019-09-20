from datetime import datetime as dt
import os.path
import json
'''load data from file'''
with open('pr_dmz_list.json') as f:
  data = json.load(f)
'''data is a dictionary 
print(data)'''

'''onPlatform function check if a particular application is present on WebOps Platform.
query is the sub-array in which complete json data is stored'''
def onPlatform():
    countYes = 0
    countTBD = 0
    countNo = 0
    for dataitem in data['query']:
        searchFor = '155.91.16'
        searchForNext = 'TBD'
        if searchFor in dataitem['DNS'] or searchFor in dataitem['Alias']:
            countYes = countYes+1
            dataitem['onPlatform'] = 'Yes'
        elif searchForNext in dataitem['DNS'] or searchFor in dataitem['Alias']:
            countTBD = countTBD+1
            dataitem['onPlatform'] = 'TBD'
        else:
            countNo = countNo+1
            dataitem['onPlatform'] = 'No'
    print(countYes)
    print(countTBD)
    print(countNo)
    return data

'''isJavaOK function check if a particular application is present on WebOps Platform.
query is the sub-array in which complete json data is stored'''
def isJavaOK():
    countOK = 0
    countOdd = 0
    for dataitem in data['query']:
        searchFor = 'java:0k'
        searchForNext = 'No NAS'
        if searchFor in dataitem['FileSize'] or searchForNext in dataitem['FileSize']:
            countOdd = countOdd+1
            dataitem['isJavaOK'] = 'Odd'
        else:
            countOK = countOK+1
            dataitem['isJavaOK'] = 'OK'
    print(countOdd)
    print(countOK)
    return data

'''isDecomm function check if a particular application is present on WebOps Platform.
query is the sub-array in which complete json data is stored'''
def isDecomm():
    countYes = 0
    countNo = 0
    for dataitem in data['query']:
        searchFor = 'Yes'
        searchFor1 = 'No'
        searchForNext = '_decom'
        if searchFor in dataitem['onPlatform']:
            countYes = countYes+1
            dataitem['isDecomm'] = 'No'
        elif searchFor1 in dataitem['onPlatform'] and searchForNext in dataitem['Application']:
            countNo = countNo+1
            dataitem['isDecomm'] = 'OK'
    print(countYes)
    print(countNo)
    return data

'''isDecomm function check if a particular application is present on WebOps Platform.
query is the sub-array in which complete json data is stored'''
def proposedDecision():
    countP = 0
    countA = 0
    countM = 0
    countT = 0
    for dataitem in data['query']:
        searchFor = 'No'
        search = 'Vanity'
        searchJava = 'Odd'
        searchDate = dt.strptime('01/01/2014', "%m/%d/%Y")
        if dataitem['LastDeployed'] != 'NA':
            actualDate = dt.strptime(dataitem['LastDeployed'], "%m/%d/%Y")
        else:
            actualDate = 0
        searchForNext = '999'
        '''If category is Application and Website'''
        if search not in dataitem['Category']:
            if searchFor in dataitem['onPlatform']:
                countP = countP +1
                dataitem['proposedDecision'] = 'Passive Decommission'
            elif dataitem['Traffic'] > searchForNext:  
                if actualDate == 0:
                    countT = countT+1
                    dataitem['proposedDecision'] = 'TBD'
                else:
                    countM = countM+1
                    dataitem['proposedDecision'] = 'Migrate'
                
            else:
                if actualDate == 0:
                    countT = countT+1
                    dataitem['proposedDecision'] = 'TBD'
                elif actualDate > searchDate:
                    countM = countM+1
                    dataitem['proposedDecision'] = 'Migrate'
                else:
                    
                '''If category is Vanity'''
        else:
            if searchFor in dataitem['onPlatform']:
                countP = countP +1
                dataitem['proposedDecision'] = 'Passive Decommission'
            else:
                countM = countM+1
                dataitem['proposedDecision'] = 'Migrate'
    print(countP)
    print(countM)
    print(countA)
    print(countT)
    return data
'''dictionary updated after onPlatform() is returned'''
data = onPlatform()
data = isJavaOK()
data = proposedDecision()

save_path = 'C:/Users/j.dharmik.gondane/Documents/Angular/Project/src/assets'
completeName = os.path.join(save_path, "pr_dmz_list_updated.json") 
with open(completeName, 'w') as json_file:
  json.dump(data, json_file)
