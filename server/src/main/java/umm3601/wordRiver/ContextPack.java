package umm3601.wordRiver;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.mongojack.Id;
import org.mongojack.ObjectId;
@JsonIgnoreProperties(ignoreUnknown=true)
public class ContextPack {

  @ObjectId @Id
  public String _id;


  public String name;
  public String icon;
  public boolean enabled;
  public ArrayList<WordList> wordlists;
}
