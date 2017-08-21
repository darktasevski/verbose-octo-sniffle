string CensorString1(string text,string remove){
	string result = "";
	for(int i=0;i<text.length();i++){
		bool foundd = false;
		for(int k=0;k<remove.length();k++){
			if(text[i]==remove[k]){
				found = true;
				break;
			}
		}
		if(!found){
			result += text[i]
		}
	}
	return result;
}

/**
 * we can also do the same thing by using the .find and .sustr method from the string class
 * ----------------------------------------------------------------------------------------
 */
string CensorString2(string text, string remove){
	int pos;
	string result = text;

	for(int i=0; i<remove.length(); i++){
		while(true){
			pos = result.find(remove[i]);
			if(pos == string::npos){
				break;
			}else{
				result = result.substr(0, pos) + result.substr(pos + 1);
			} 
		}
	}
	return result;
}

/**
 * To write it so that we modify the original string rather than returning a new string ,we
 * could do the following
 * ----------------------------------------------------------------------------------------
 */
void CensorString3(string &text,string remove){
	for(int i=0;i<remove.length();i++){
		int pos = 0;
		while((pos)=text.find(remove[i],pos)!=string::npos){
			text.replace(pos,1,"") //replace the char with empty string
		}
	}
}

/**
 * Files and Structs
 * ------------------
 */
struct statsT{
	int low;
	int high;
	double average;
}

statsT CalculateStatistics(string filename){
	statsT states:
	stats.low = 101;
	stats.high = -1;

	int total = 0;
	int count = 0;

	//Open a new filestream and make sure it worked
	ifstream in;
	in.open(filename.c_str());
	if(in.fail())
		Error("Could not read '"+filename+"'");

	while (true){
		int num;
		in>> num;
		//check that we read successfully
		if(in.fail())
			break;
		//Update or data if we need to
		if(num<stats.low)
			stats.low = num;
		if(num>stats.high)
			stats.high = num;
		total += num;
		count++;
	}
	//Donnot forget to watch for integer division!
	stats.average = double(total)/count;
	//And make sure to close your files;
	in.close();
	return statsd
}











