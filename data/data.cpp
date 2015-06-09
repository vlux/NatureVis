

int main(){
    int month[15] = [31,28,31,30,31,30,31,31,30,31,30,31];
    int ans[15];
    int idx,temp;
    int j = 1;
    for(int i = 0 ; i < 12 ; ++i)
        for(idx = 0,temp = 0;j <= 365;)
                if(++idx < month[i])
                	temp += day[j++];
                else{
                    ans[i] = temp / month[i];
                    break;
                }

}
