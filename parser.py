import csv

fpin = open('dataset.csv', 'r')
finter = open('codemapping.csv', 'r')
codes = []
country = []
final = []
finalRow = []
dataset = []

for line2 in finter:
    row2 = line2.strip().split(",")
    country = []
    for i in row2:
        ele = i.strip().replace('"', "")
        country.append(ele)
    codes.append(country)




for line in fpin:
    row = line.strip().split(",")
    dataset.append(row)
    for k in codes:
        if row[0] ==  k[0] or k[0] in row[0]:
            finalRow = []
            finalRow.append(row[0]) # name
            finalRow.append(k[1].lower()) # code
            finalRow.extend(row[1:])
            final.append(finalRow)
            break

# check for mismatches
# for element in final:
#     if len(element[2]) != 2:
#         print element

with open('assets/data/codes.csv','wb') as myfile:
  wr = csv.writer(myfile) #, quoting=csv.QUOTE_ALL)
  wr.writerows(final)

# for entry in final:
#     # print entry[0] + ", "  + entry[2].lower()
#     print entry
#     fbout.write(entry)





# checking length and diff


def Diff(li1, li2): 
    li_dif = [i for i in li1 + li2 if i not in li1 or i not in li2] 
    return li_dif 

list1 = []
list2 = []
for element in final:
    list1.append(element[0])
    # print element
for element2 in dataset:
    list2.append(element2[0])
# print len(codes), len(final)  , len(dataset) 

# length of original dataset - 255
# length of used dataset - 230

# countries that don't have codes due to name mismatch
# print Diff(list1, list2)


