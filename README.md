# Overview

A collection of scripts for Adobe Illustrator. Free to use, modify, and redistribute.

## RandomSelection.jsx

This script can be used to randomly select a percentage or specific number
of objects from within the current selection. The selection algorithm is
optimized so that it will select or deselect based on how many operations
have to be completed. Regardless, it may take some time to run the script
on large sets of objects.

**How to use:**

1. Select which mode you'd like to use. 
	The 'Percentage' mode will select that percentage of objects from within the current selection in the document. 
	The 'Count' mode will select the exact number of objects entered in the 'Value' field.
There is error handling for selecting too many or too few objects, as well as for entering non-valid values for the 'Value' field. 
